import { Injectable } from '@nestjs/common'

import { EntitySaver } from '@back/db/EntitySaver'
import { Currency } from '@shared/enum/Currency'

import { UserRepository } from '../domain/UserRepository'

@Injectable()
export class ProfileEditor {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async changeCurrency(login: string, currency: Currency) {
    const user = await this.userRepo.getOne(login)

    user.profile.changeCurrency(currency)

    await this.entitySaver.save(user)
  }
}
