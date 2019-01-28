import { Injectable } from '@nestjs/common'

import { EntitySaver } from '@back/db/EntitySaver'

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

    this.editName(user, fields)

    await this.entitySaver.save(user)
  }

  private editName(user: User, { name }: ProfileFields): void {
    if (name.length > 1) {
      user.profile.changeName(name)
    } else {
      user.profile.removeName()
    }
  }
}
