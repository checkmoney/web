import * as md5 from 'md5';

import { IncomeRepository } from '&back/money/domain/IncomeRepository';
import { OutcomeRepository } from '&back/money/domain/OutcomeRepository';
import { TipAction } from '&shared/enum/TipAction';
import { TipModel } from '&shared/models/mind/TipModel';

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser';
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser';
import { findTypos } from '../calculator/findTypos';

@IsAdviser()
export class TypoAdviser implements Adviser {
  public constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
  ) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const [sourceTypos, categoryTypos] = await Promise.all([
      this.incomeRepo.findSourcesForUser(userLogin).then(findTypos),
      this.outcomeRepo.findCategoriesForUser(userLogin).then(findTypos),
    ]);

    const now = new Date();

    return [
      ...sourceTypos.map(sources => ({
        date: now,
        action: TipAction.MergeSources,
        meta: sources,
        token: this.createToken(sources, TipAction.MergeSources),
      })),
      ...categoryTypos.map(categories => ({
        date: now,
        action: TipAction.MergeCategories,
        meta: categories,
        token: this.createToken(categories, TipAction.MergeCategories),
      })),
    ];
  }

  private createToken(variants: Set<string>, action: TipAction): string {
    const payload = {
      variants: Array.from(variants).sort(),
      action,
    };

    return md5(JSON.stringify(payload));
  }
}
