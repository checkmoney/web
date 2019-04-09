import * as md5 from 'md5'

import { TipModel } from '@shared/models/mind/TipModel'
import { TipAction } from '@shared/enum/TipAction'

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser'
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser'
import { Statistician } from '@back/money/application/Statistician'
import { GroupBy } from '@shared/enum/GroupBy'
import { Currency } from '@shared/enum/Currency'
import { addMonths, lastDayOfMonth, differenceInDays } from 'date-fns'

@IsAdviser()
export class BudgetAdviser implements Adviser {
  public constructor(private readonly statistician: Statistician) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const now = new Date()

    const [_, ...stats] = await this.statistician.showDateRangeStats(
      userLogin,
      { from: new Date(addMonths(new Date(), -2)), to: new Date() },
      GroupBy.Month,
      Currency.USD,
    )

    const lastMonthIncome = stats[0].income
    const thisMonthOutcome = stats[1].outcome
    const expectedProfit = lastMonthIncome - thisMonthOutcome
    const daysRemainInMonth = differenceInDays(
      lastDayOfMonth(new Date()),
      new Date(),
    )
    const result = expectedProfit / daysRemainInMonth

    return [
      {
        date: now,
        action: TipAction.MergeSources,
        meta: result,
        token: this.createToken([''], TipAction.MergeSources),
      },
    ]
  }

  private createToken(variants: string[], action: TipAction): string {
    const payload = {
      variants: variants.sort(),
      action,
    }

    return md5(JSON.stringify(payload))
  }
}
