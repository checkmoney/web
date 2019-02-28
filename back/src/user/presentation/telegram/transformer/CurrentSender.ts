import { Injectable } from '@nestjs/common'
import { ContextTransformer, Context } from 'nest-telegram'

import { UserRepository } from '@back/user/domain/UserRepository'
import { TokenPayload } from '@back/user/application/dto/TokenPayload'

@Injectable()
export class CurrentSender implements ContextTransformer<TokenPayload> {
  public constructor(private readonly userRepo: UserRepository) {}

  public async transform(ctx: Context) {
    const user = await this.userRepo.getOneByTeleram(ctx.from.id)

    return {
      login: user.login,
    }
  }
}
