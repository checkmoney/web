import * as md5 from 'md5'

import { TipModel } from '@shared/models/mind/TipModel'
import { TipAction } from '@shared/enum/TipAction'

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser'
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser'
import { TypoFinder } from '../TypoFinder'

@IsAdviser()
export class TypoAdviser implements Adviser {
  public constructor(private readonly typoFinder: TypoFinder) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const [sourceTypos, categoryTypos] = await Promise.all([
      this.typoFinder.findTyposInSources(userLogin),
      this.typoFinder.findTyposInCategories(userLogin),
    ])

    const now = new Date()

    return [
      ...sourceTypos.map(sources => ({
        date: now,
        action: TipAction.MergeSources,
        meta: sources,
        token: this.createToken(sources, TipAction.MergeSources, userLogin),
      })),
      ...categoryTypos.map(categories => ({
        date: now,
        action: TipAction.MergeCategories,
        meta: categories,
        token: this.createToken(
          categories,
          TipAction.MergeCategories,
          userLogin,
        ),
      })),
    ]
  }

  private createToken(
    variants: string[],
    action: TipAction,
    userLogin: string,
  ): string {
    const payload = {
      variants: variants.sort(),
      action,
      userLogin,
    }

    return md5(JSON.stringify(payload))
  }
}
