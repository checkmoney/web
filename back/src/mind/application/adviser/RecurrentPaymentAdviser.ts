import * as md5 from 'md5'
import {
  startOfMonth,
  subMonths,
  getDate,
  endOfMonth,
  subDays,
  addDays,
  getDaysInMonth,
  lastDayOfMonth,
} from 'date-fns'

import { TipModel } from '$shared/models/mind/TipModel'
import { TipAction } from '$shared/enum/TipAction'
import { Historian } from '$back/money/application/Historian'
import { GroupBy } from '$shared/enum/GroupBy'
import { Currency } from '$shared/enum/Currency'
import { Outcome } from '$back/money/domain/Outcome.entity'

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser'
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser'

@IsAdviser()
export class RecurrentPaymentAdviser implements Adviser {
  public constructor(private readonly historian: Historian) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const MONTH_FOR_RETROSPECTIVE = 3
    const DAYS_GAP = 5

    const now = new Date()

    const startOfSearch = startOfMonth(subMonths(now, MONTH_FOR_RETROSPECTIVE))
    const endOfSeacrh = startOfMonth(subMonths(now, 1))

    const [history, [thisMonthHistory]] = await Promise.all([
      this.historian.showGroupedHistory(
        userLogin,
        { from: startOfSearch, to: endOfSeacrh },
        GroupBy.Month,
      ),
      this.historian.showGroupedHistory(
        userLogin,
        { from: startOfMonth(now), to: endOfMonth(now) },
        GroupBy.Month,
      ),
    ])

    const [initialGroup, ...otherGroups] = history.map(
      ({ outcomes }) => outcomes,
    )
    const nowGroup = thisMonthHistory.outcomes

    const transactionExistInGroup = (transaction: Outcome) => (
      group: Outcome[],
    ) =>
      group.some(t => {
        const sameAmount = t.amount === transaction.amount
        const sameCurrency = t.currency === transaction.currency
        const sameDate =
          Math.abs(getDate(t.date) - getDate(transaction.date)) <= DAYS_GAP
        const sameCategory = t.category === transaction.category

        return sameAmount && sameCurrency && sameDate && sameCategory
      })

    const recurrentTransactions = initialGroup
      .filter(transaction =>
        otherGroups.every(transactionExistInGroup(transaction)),
      )
      .filter(transaction => !transactionExistInGroup(transaction)(nowGroup))
      .filter(transaction => {
        const transactionDate = getDate(transaction.date)
        const nowDate = getDate(now)

        const future = transactionDate >= nowDate
        const soon = Math.abs(transactionDate - nowDate) < DAYS_GAP

        return future && soon
      })

    const getPeriod = (date: Date) => {
      const start = getDate(subDays(date, DAYS_GAP))
      const end = getDate(addDays(date, DAYS_GAP))

      const startValid = start >= 1
      const endValid = end <= getDaysInMonth(date)

      return {
        from: startValid ? start : 1,
        to: endValid ? end : getDate(lastDayOfMonth(date)),
      }
    }

    return recurrentTransactions.map(
      ({ amount, category, currency, date }) => ({
        token: this.createToken(
          category,
          amount,
          currency,
          TipAction.RecurrentPayment,
        ),
        date: now,
        action: TipAction.RecurrentPayment,
        meta: {
          amount,
          category,
          currency,
          period: getPeriod(date),
        },
      }),
    )
  }

  private createToken(
    category: string,
    amount: number,
    currency: Currency,
    action: TipAction,
  ): string {
    const payload = {
      category,
      amount,
      currency,
      action,
    }

    return md5(JSON.stringify(payload))
  }
}
