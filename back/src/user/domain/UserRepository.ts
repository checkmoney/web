import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './User.entity'

@Injectable()
class UserRepo {
  public constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async getOne(login: string): Promise<User> {
    const user = await this.userRepo.findOne(login)

    if (!user) {
      // TODO: throw error
    }

    return user
  }
}

export const UserRepository = UserRepo
export type UserRepository = UserRepo
