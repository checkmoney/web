import { Injectable } from '@nestjs/common'

import { EntitySaver } from '@back/db/EntitySaver'

import { User } from '../domain/User.entity'
import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder'

@Injectable()
export class Registrator {
  public constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async signUp(login: string, password: string): Promise<void> {
    const user = new User(login)

    await user.changePassword(password, this.passwordEncoder)

    await this.entitySaver.save(user)
  }
}
