import * as md5 from 'md5';

import { CustomTip } from '&back/mind/domain/CustomTip.entity';
import { CustomTipRepository } from '&back/mind/domain/CustomTipRepository';
import { TipAction } from '&shared/enum/TipAction';
import { TipModel } from '&shared/models/mind/TipModel';

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser';
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser';

@IsAdviser()
export class CustomAdviser implements Adviser {
  public constructor(private readonly customTipRepo: CustomTipRepository) {}

  public async giveAdvice(): Promise<TipModel[]> {
    const tips = await this.customTipRepo.findActual();
    const now = new Date();

    return tips.map(tip => ({
      action: TipAction.Custom,
      meta: tip,
      token: this.createToken(tip, TipAction.Custom),
      date: now,
    }));
  }

  private createToken(tip: CustomTip, action: TipAction): string {
    const payload = {
      id: tip.id,
      action,
    };

    return md5(JSON.stringify(payload));
  }
}
