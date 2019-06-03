import { Injectable } from '@nestjs/common'
import { UserRepository } from '$back/user/domain/UserRepository'
import { ContextTransformer, Context } from 'nest-telegram'

@Injectable()
export class IsKnownUser implements ContextTransformer<boolean> {
  public constructor(private readonly userRepo: UserRepository) {}

  public async transform(ctx: Context) {
    const user = await this.userRepo.findOneByTelegram(ctx.from.id)

    return user.nonEmpty()
  }
}
