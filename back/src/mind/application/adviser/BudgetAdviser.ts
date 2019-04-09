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

    const [_, ...monthsStats] = await this.statistician.showDateRangeStats(
      userLogin,
      // TODO: use -1 instead of -2
      { from: addMonths(new Date(), -2), to: new Date() },
      GroupBy.Month,
      Currency.USD,
    )

    const lastMonthIncome = monthsStats[0].income
    const thisMonthOutcome = monthsStats[1].outcome
    const expectedProfit = lastMonthIncome - thisMonthOutcome
    const daysRemainInMonth = differenceInDays(
      lastDayOfMonth(new Date()),
      new Date(),
    )
    // TODO: substract todays outcome
    const dailyBudget = expectedProfit / daysRemainInMonth

    return [
      {
        date: now,
        action: TipAction.DailyBudget,
        meta: dailyBudget,
        token: this.createToken([`${dailyBudget}`], TipAction.DailyBudget),
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
