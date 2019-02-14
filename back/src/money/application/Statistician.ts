import { Injectable } from '@nestjs/common'

import { createGroups } from '@back/utils/infrastructure/dateGroups/createGroups'
import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { AbstractTransaction } from '../domain/dto/AbstarctTransaction'
import { Transaction } from '../domain/dto/Transaction'
import { IncomeRepository } from '../domain/IncomeRepository'
import { OutcomeRepository } from '../domain/OutcomeRepository'
import { CurrencyConverter } from './CurrencyConverter'
import { amountMapper } from './helpers/amountMapper'
import { rangeFilter } from './helpers/rangeFilter'
import { sumReducer } from './helpers/sumReducer'

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
    groupBy: GroupBy,
    currency: Currency,
  ) {
    const [incomes, outcomes] = await Promise.all([
      this.incomeRepo.findByRangeForUser(userLogin, dateRange),
      this.outcomeRepo.findByRangeForUser(userLogin, dateRange),
    ])

    const groups = createGroups(groupBy)(dateRange)

    const [convertedIncomes, convertedOutcomes] = await Promise.all([
      Promise.all(incomes.map(this.convertItem(currency))),
      Promise.all(outcomes.map(this.convertItem(currency))),
    ])

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

  private convertItem(targetCurrency: Currency) {
    return async (item: AbstractTransaction): Promise<Transaction> => {
      const newAmount = await this.converter.convert(
        item.currency,
        targetCurrency,
        item.amount,
      )

      return new Transaction(newAmount, targetCurrency, item.date)
    }
  }
}
