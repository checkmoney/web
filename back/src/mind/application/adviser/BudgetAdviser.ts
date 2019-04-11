import * as md5 from 'md5'
import {
  lastDayOfMonth,
  differenceInDays,
  subMonths,
  startOfMonth,
  format,
} from 'date-fns'

import { formatDate } from '@shared/helpers/formatDate'
import { TipModel } from '@shared/models/mind/TipModel'
import { TipAction } from '@shared/enum/TipAction'
import { Statistician } from '@back/money/application/Statistician'
import { UserRepository } from '@back/user/domain/UserRepository'
import { GroupBy } from '@shared/enum/GroupBy'
import { Currency } from '@shared/enum/Currency'

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser'
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser'

@IsAdviser()
export class BudgetAdviser implements Adviser {
  public constructor(
    private readonly statistician: Statistician,
    private readonly userRepo: UserRepository,
  ) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const now = new Date()

    const currency = await this.userRepo.getDefaultCurrency(userLogin)

    const [monthsStats, todaysStats] = await Promise.all([
      this.getMonthsStats(userLogin, currency),
      this.getTodaysStats(userLogin, currency),
    ])

    const amount = this.calculateAmount(
      monthsStats[0].income,
      monthsStats[1].outcome,
      todaysStats[0].outcome,
    )

    return [
      {
        date: now,
        action: TipAction.DailyBudget,
        meta: { amount: amount, currency },
        token: this.createToken(amount, now, TipAction.DailyBudget),
      },
    ]
  }

  private async getTodaysStats(userLogin: string, currency: Currency) {
    const now = new Date()

    const todaysStats = await this.statistician.showDateRangeStats(
      userLogin,
      { from: now, to: now },
      GroupBy.Day,
      currency,
    )
    return todaysStats
  }

  private async getMonthsStats(userLogin: string, currency: Currency) {
    const now = new Date()
    const startDate = startOfMonth(subMonths(now, 1))
    const monthsStats = await this.statistician.showDateRangeStats(
      userLogin,
      { from: startDate, to: now },
      GroupBy.Month,
      currency,
    )
    return monthsStats
  }

  private calculateAmount(
    prevMonthIncome: number,
    thisMonthOutcome: number,
    todaysOutcome: number,
  ) {
    const expectedProfit = prevMonthIncome - thisMonthOutcome
    const daysRemainInMonth = this.getDaysRemainInMonth()
    const amount = this.calculateRawAmount(
      expectedProfit,
      daysRemainInMonth,
      todaysOutcome,
    )
    const roundedAmount = this.roundAmount(amount)

    return roundedAmount
  }

  private getDaysRemainInMonth = () => {
    const now = new Date()

    return differenceInDays(lastDayOfMonth(now), now)
  }

  private calculateRawAmount(
    expectedProfit: number,
    daysRemainInMonth: number,
    todaysOutcome: number,
  ) {
    return expectedProfit / daysRemainInMonth - todaysOutcome
  }

  private roundAmount(amount: number) {
    return amount > 0 ? Math.round(amount) : 0
  }

  private createToken(amount: number, date: Date, action: TipAction): string {
    const payload = {
      variant: `${amount}${formatDate(date)}`,
      action,
    }

    return md5(JSON.stringify(payload))
  }
}
