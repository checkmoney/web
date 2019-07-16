import * as md5 from 'md5'
import {
  lastDayOfMonth,
  differenceInDays,
  subMonths,
  startOfMonth,
  format,
  getDate,
  getDaysInMonth,
} from 'date-fns'

import { formatDate } from '&shared/helpers/formatDate'
import { TipModel } from '&shared/models/mind/TipModel'
import { TipAction } from '&shared/enum/TipAction'
import { Statistician } from '&back/money/application/Statistician'
import { UserRepository } from '&back/user/domain/UserRepository'
import { GroupBy } from '&shared/enum/GroupBy'
import { Currency } from '&shared/enum/Currency'

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser'
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser'
import { calculateBudget } from '../calculator/calculateBudget'

@IsAdviser()
export class BudgetAdviser implements Adviser {
  public constructor(
    private readonly statistician: Statistician,
    private readonly userRepo: UserRepository,
  ) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const currency = await this.userRepo.getDefaultCurrency(userLogin)

    const [monthsStats, todaysStats] = await Promise.all([
      this.getMonthsStats(userLogin, currency),
      this.getTodaysStats(userLogin, currency),
    ])

    const money = {
      ...monthsStats,
      ...todaysStats,
    }

    const now = new Date()

    const amount = calculateBudget(money, now)

    return [
      {
        date: now,
        action: TipAction.DailyBudget,
        meta: { amount, currency },
        token: this.createToken(now, TipAction.DailyBudget),
      },
    ]
  }

  private async getTodaysStats(userLogin: string, currency: Currency) {
    const now = new Date()

    const [todaysStats] = await this.statistician.showDateRangeStats(
      userLogin,
      { from: now, to: now },
      GroupBy.Day,
      currency,
    )

    return {
      todayOutcome: todaysStats.outcome,
    }
  }

  private async getMonthsStats(userLogin: string, currency: Currency) {
    const now = new Date()
    const startDate = startOfMonth(subMonths(now, 1))

    const [
      previousMonth,
      thisMonth,
    ] = await this.statistician.showDateRangeStats(
      userLogin,
      { from: startDate, to: now },
      GroupBy.Month,
      currency,
    )

    return {
      previousMonthIncome: previousMonth.income,
      thisMonthOutcome: thisMonth.outcome,
    }
  }

  private createToken(date: Date, action: TipAction): string {
    const payload = {
      variant: `${formatDate(date)}`,
      action,
    }

    return md5(JSON.stringify(payload))
  }
}
