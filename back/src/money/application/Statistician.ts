import { Injectable } from '@nestjs/common'
import { groupBy } from 'lodash'
import { Assign, Intersection } from 'utility-types'

import { CategoryGroupOutcomeModel } from '@shared/models/money/CategoryGroupOutcomeModel'
import { SourceGroupIncomeModel } from '@shared/models/money/SourceGroupIncomeModel'
import { createGroups } from '@back/utils/infrastructure/dateGroups/createGroups'
import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { TransactionRepository } from '../domain/interfaces/TransactionRepository'
import { AbstractTransaction } from '../domain/interfaces/AbstarctTransaction'
import { OutcomeRepository } from '../domain/OutcomeRepository'
import { IncomeRepository } from '../domain/IncomeRepository'
import { CurrencyConverter } from './CurrencyConverter'
import { Transaction } from '../domain/dto/Transaction'
import { amountMapper } from './helpers/amountMapper'
import { rangeFilter } from './helpers/rangeFilter'
import { sumReducer } from './helpers/sumReducer'
import { SummedGroup } from './types/SummedGroup'

@Injectable()
export class Statistician {
  public constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
    private readonly converter: CurrencyConverter,
  ) {}

  public async showDateRangeStats(
    userLogin: string,
    dateRange: DateRange,
    statsGroupBy: GroupBy,
    currency: Currency,
  ) {
    const [incomes, outcomes] = await Promise.all([
      this.incomeRepo.findByRangeForUser(userLogin, dateRange),
      this.outcomeRepo.findByRangeForUser(userLogin, dateRange),
    ])

    const [convertedIncomes, convertedOutcomes] = await Promise.all([
      this.convertItems(currency)(incomes),
      this.convertItems(currency)(outcomes),
    ])

    const groups = createGroups(statsGroupBy)(dateRange)

    return groups.map(group => ({
      currency,
      start: group.from,
      end: group.to,
      income: convertedIncomes
        .filter(rangeFilter(group))
        .map(amountMapper)
        .reduce(sumReducer, 0),
      outcome: convertedOutcomes
        .filter(rangeFilter(group))
        .map(amountMapper)
        .reduce(sumReducer, 0),
    }))
  }

  public async showCategories(
    userLogin: string,
    dateRange: DateRange,
    currency: Currency,
  ): Promise<CategoryGroupOutcomeModel[]> {
    return this.showGrouped(
      userLogin,
      dateRange,
      currency,
      this.outcomeRepo,
      'category',
      'outcome',
    )
  }

  public async showSources(
    userLogin: string,
    dateRange: DateRange,
    currency: Currency,
  ): Promise<SourceGroupIncomeModel[]> {
    return this.showGrouped(
      userLogin,
      dateRange,
      currency,
      this.incomeRepo,
      'source',
      'income',
    )
  }

  private async showGrouped<T extends string, K extends string>(
    userLogin: string,
    dateRange: DateRange,
    currency: Currency,
    repo: TransactionRepository,
    groupKey: T,
    sumKey: K,
  ): Promise<SummedGroup<T, K>[]> {
    const rawTransactions = await repo.findByRangeForUser(userLogin, dateRange)

    const groups = Object.entries(groupBy(rawTransactions, groupKey)).map(
      ([key, transactions]) => ({
        key,
        transactions,
      }),
    )

    const convertedGroups = await Promise.all(
      groups.map(async ({ key, transactions }) => ({
        key,
        transactions: await this.convertItems(currency)(transactions),
      })),
    )

    const summedGroups = convertedGroups.map(
      ({ key, transactions }) =>
        ({
          [groupKey]: key,
          [sumKey]: transactions.map(amountMapper).reduce(sumReducer, 0),
          currency,
        } as SummedGroup<T, K>),
    )

    return summedGroups
  }

  private convertItems(targetCurrency: Currency) {
    return (items: AbstractTransaction[]): Promise<Transaction[]> =>
      Promise.all(
        items.map(async item => {
          const newAmount = await this.converter.convert(
            item.currency,
            targetCurrency,
            item.amount,
            item.date,
          )

          return new Transaction(newAmount, targetCurrency, item.date)
        }),
      )
  }
}
