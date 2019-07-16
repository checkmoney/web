import { Injectable } from '@nestjs/common'

import { EntitySaver } from '&back/db/EntitySaver'

import { User } from '../domain/User.entity'
import { UserRepository } from '../domain/UserRepository'
import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder'
import { LoginAlreadyTakenException } from './exception/LoginAlreadyTakenException'

@Injectable()
export class Registrator {
  public constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly entitySaver: EntitySaver,
    private readonly userRepo: UserRepository,
  ) {}

  public async signUp(login: string, password: string): Promise<void> {
    const existUser = await this.userRepo.findOne(login)
    if (existUser.nonEmpty()) {
      throw new LoginAlreadyTakenException(login)
    }

    const user = new User(login)

    await user.changePassword(password, this.passwordEncoder)

    await this.entitySaver.save(user)
  }

  public async addTelegramAccount(
    login: string,
    telegramId: number,
  ): Promise<void> {
    const attachedUser = await this.userRepo.findOneByTelegram(telegramId)
    if (attachedUser.nonEmpty()) {
      throw new LoginAlreadyTakenException(login)
    }

    const user = await this.userRepo.getOne(login)

    user.attachTelegram(telegramId)

    await this.entitySaver.save(user)
  }
}
