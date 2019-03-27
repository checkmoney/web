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

    console.log(sourceTypos, categoryTypos)

    return [
      {
        date: new Date(),
        theme: userLogin,
        action: TipAction.Nothing,
      },
    ]
  }
}
