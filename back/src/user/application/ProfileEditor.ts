import { DetBell, DrKhomyuk } from '@checkmoney/soap-opera';
import { Injectable } from '@nestjs/common';

import { EntitySaver } from '&back/db/EntitySaver';
import { Currency } from '&shared/enum/Currency';

import { UserRepository } from '../domain/UserRepository';

@Injectable()
export class ProfileEditor {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly entitySaver: EntitySaver,
    private readonly users: DetBell,
    private readonly statistics: DrKhomyuk,
  ) {}

  public async changeCurrency(login: string, currency: Currency) {
    const user = await this.userRepo.getOne(login);

    user.profile.defaultCurrency = currency;

    await this.entitySaver.save(user);

    const token = await this.users.pretend(login);
    await this.statistics.triggers.currency(token);
  }

  public async changeWeekStart(login: string, onMonday: boolean) {
    const user = await this.userRepo.getOne(login);

    user.profile.weekStartsOnMonday = onMonday;

    await this.entitySaver.save(user);
  }
}
