import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'tsoption';
import { Repository } from 'typeorm';

import { EntityNotFoundException } from '&back/utils/domain/EntityNotFoundException';
import { Currency } from '&shared/enum/Currency';

import { User } from './User.entity';

@Injectable()
class UserRepo {
  public constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async getOne(login: string): Promise<User> {
    const user = await this.userRepo.findOne(login);

    if (!user) {
      throw new EntityNotFoundException(User.name, {
        login,
      });
    }

    return user;
  }

  public async findOne(login: string): Promise<Option<User>> {
    const user = await this.userRepo.findOne(login);

    return Option.of(user);
  }

  public async getOneByTeleram(telegramId: number): Promise<User> {
    const user = await this.findOneByTelegram(telegramId);

    if (user.nonEmpty()) {
      return user.get();
    }

    throw new EntityNotFoundException(User.name, {
      telegramId,
    });
  }

  public async findOneByTelegram(telegramId: number): Promise<Option<User>> {
    const user = await this.userRepo
      .createQueryBuilder()
      .where({
        telegramId,
      })
      .getOne();

    return Option.of(user);
  }

  public async findOneByGoogle(googleId: string): Promise<Option<User>> {
    const user = await this.userRepo
      .createQueryBuilder()
      .where({
        googleId,
      })
      .getOne();

    return Option.of(user);
  }

  public async getDefaultCurrency(login: string): Promise<Currency> {
    const user = await this.getOne(login);

    return user.profile.defaultCurrency;
  }

  public async getWeekStartsOn(login: string): Promise<number> {
    const user = await this.getOne(login);

    return user.profile.weekStartsOnMonday ? 1 : 0;
  }
}

export const UserRepository = UserRepo;
export type UserRepository = UserRepo;
