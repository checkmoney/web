import { Injectable } from '@nestjs/common'

import { EntitySaver } from '@back/db/EntitySaver'
import { Currency } from '@shared/enum/Currency'

import { User } from '../domain/User.entity'
import { UserRepository } from '../domain/UserRepository'
import { ProfileFields } from './dto/ProfileFields'

@Injectable()
export class ProfileEditor {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async edit(login: string, fields: ProfileFields): Promise<void> {
    const user = await this.userRepo.getOne(login)

    const { name } = fields

    user.profile.changeName(name)

    await this.entitySaver.save(user)
  }

  public async changeCurrency(login: string, currency: Currency) {
    const user = await this.userRepo.getOne(login)

    user.profile.changeCurrency(currency)

    await this.entitySaver.save(user)
  }
}
