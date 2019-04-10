import * as md5 from 'md5'

import { TipModel } from '@shared/models/mind/TipModel'
import { TipAction } from '@shared/enum/TipAction'

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser'
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser'
import { Statistician } from '@back/money/application/Statistician'
import { GroupBy } from '@shared/enum/GroupBy'
import { Currency } from '@shared/enum/Currency'
import { lastDayOfMonth, differenceInDays, subMonths } from 'date-fns'
import { DateRangeStats } from '@shared/models/money/DateRangeStats'

@IsAdviser()
export class BudgetAdviser implements Adviser {
  public constructor(private readonly statistician: Statistician) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const now = new Date()
    // TODO: fix statistician showDateRange (currency and dates)
    const monthsStats = await this.getMonthsStats(userLogin)
    const todaysStats = await this.getTodaysStats(userLogin)
    const dailyBudget = this.calculateDailyBudget(monthsStats, todaysStats)

    return [
      {
        date: now,
        action: TipAction.DailyBudget,
        meta: dailyBudget,
        token: this.createToken([`${dailyBudget}`], TipAction.DailyBudget),
      },
    ]
  }

  private async getTodaysStats(userLogin: string) {
    const todaysStats = await this.statistician.showDateRangeStats(
      userLogin,
      { from: new Date(), to: new Date() },
      GroupBy.Day,
      Currency.USD,
    )
    return todaysStats
  }

  private async getMonthsStats(userLogin: string) {
    const [_, ...monthsStats] = await this.statistician.showDateRangeStats(
      userLogin,
      { from: subMonths(new Date(), 2), to: new Date() },
      GroupBy.Month,
      Currency.USD,
    )
    return monthsStats
  }

  private calculateDailyBudget(
    monthsStats: DateRangeStats[],
    todaysStats: DateRangeStats[],
  ) {
    const lastMonthIncome = monthsStats[0].income
    const thisMonthOutcome = monthsStats[1].outcome
    const todaysOutcome = todaysStats[0].outcome
    const expectedProfit = lastMonthIncome - thisMonthOutcome

    const daysRemainInMonth = differenceInDays(
      lastDayOfMonth(new Date()),
      new Date(),
    )
    const dailyBudget = expectedProfit / daysRemainInMonth - todaysOutcome
    return dailyBudget
  }

  private createToken(variants: string[], action: TipAction): string {
    const payload = {
      variants: variants.sort(),
      action,
    }

    return md5(JSON.stringify(payload))
  }
}
