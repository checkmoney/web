import { Injectable } from '@nestjs/common';
import { ContextTransformer, Context } from 'nest-telegram';

import { UserRepository } from '&back/user/domain/UserRepository';

@Injectable()
export class IsKnownUser implements ContextTransformer<boolean> {
  public constructor(private readonly userRepo: UserRepository) {}

  public async transform(ctx: Context) {
    const user = await this.userRepo.findOneByTelegram(ctx.from.id);

    return user.nonEmpty();
  }
}
