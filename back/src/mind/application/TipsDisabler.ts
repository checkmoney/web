import { Injectable } from '@nestjs/common';

import { EntitySaver } from '&back/db/EntitySaver';
import { UserRepository } from '&back/user/domain/UserRepository';

import { DisabledTip } from '../domain/DisabledTip.entity';

@Injectable()
export class TipsDisabler {
  public constructor(
    private readonly entitySaver: EntitySaver,
    private readonly userRepo: UserRepository,
  ) {}

  public async disable(tokens: string[], userLogin: string): Promise<void> {
    const user = await this.userRepo.getOne(userLogin);

    const disabledTips = tokens.map(token => new DisabledTip(token, user));

    await this.entitySaver.save(...disabledTips);
  }
}
