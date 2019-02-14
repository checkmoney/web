import { Injectable } from '@nestjs/common'
import { flatten, uniq } from 'lodash'

import { createGroups } from '@back/utils/infrastructure/dateGroups/createGroups'
import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { GroupBy } from '@shared/enum/GroupBy'

import { IncomeRepository } from '../domain/IncomeRepository'
import { OutcomeRepository } from '../domain/OutcomeRepository'
import { amountMapper } from './helpers/amountMapper'
import { rangeFilter } from './helpers/rangeFilter'
import { sumReducer } from './helpers/sumReducer'

@Injectable()
export class Statistician {
  public constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
  ) {}

  public async showDateRangeStats(
    userLogin: string,
    dateRange: DateRange,
    groupBy: GroupBy,
  ) {
    const [incomes, outcomes] = await Promise.all([
      this.incomeRepo.findByRangeForUser(userLogin, dateRange),
      this.outcomeRepo.findByRangeForUser(userLogin, dateRange),
    ])

    const groups = createGroups(groupBy)(dateRange)

    const foundСurrencies = uniq([
      ...incomes.map(income => income.currency),
      ...outcomes.map(outcome => outcome.currency),
    ])

    const stats = foundСurrencies.map(currency =>
      groups.map(group => ({
        currency,
        start: group.from,
        end: group.to,
        income: incomes
          .filter(rangeFilter(group))
          .map(amountMapper)
          .reduce(sumReducer, 0),
        outcome: outcomes
          .filter(rangeFilter(group))
          .map(amountMapper)
          .reduce(sumReducer, 0),
      })),
    )

    return flatten(stats)
  }
}
