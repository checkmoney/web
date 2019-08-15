import { Injectable } from '@nestjs/common';

import { TipModel } from '&shared/models/mind/TipModel';

import { DisabledTipRepository } from '../domain/DisabledTipRepository';

@Injectable()
export class TipsFilter {
  public constructor(private readonly disabledTipRepo: DisabledTipRepository) {}

  public async filter(
    tips: TipModel[],
    userLogin: string,
  ): Promise<TipModel[]> {
    const disabledTokens = await this.disabledTipRepo.findTokens(userLogin);

    return tips.filter(tip => !disabledTokens.includes(tip.token));
  }
}
