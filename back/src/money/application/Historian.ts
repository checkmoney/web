import { Injectable } from '@nestjs/common'
import { min } from 'date-fns'

import { createMonthGroups } from '@back/utils/infrastructure/dateGroups/createMonthGroups'
import { createWeekGroups } from '@back/utils/infrastructure/dateGroups/createWeekGroups'
import { createYearGroups } from '@back/utils/infrastructure/dateGroups/createYearGroups'
import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { GroupBy } from '@shared/enum/GroupBy'

import { IncomeRepository } from '../domain/IncomeRepository'
import { OutcomeRepository } from '../domain/OutcomeRepository'

@Injectable()
export class Historian {
  public constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
  ) {}

  public async getDateOfEarliestTransaction(userLogin: string) {
    const [income, outcome] = await Promise.all([
      this.incomeRepo.findEarliest(userLogin),
      this.outcomeRepo.findEarliest(userLogin),
    ])

    return min(
      income.map(i => i.date).getOrElse(new Date()),
      outcome.map(o => o.date).getOrElse(new Date()),
    )
  }

  public async showGroupedHistory(
    userLogin: string,
    dateRange: DateRange,
    groupBy: GroupBy,
  ) {
    const [incomes, outcomes] = await Promise.all([
      this.incomeRepo.findByRangeForUser(userLogin, dateRange),
      this.outcomeRepo.findByRangeForUser(userLogin, dateRange),
    ])

    const groups = {
      [GroupBy.Year]: createYearGroups,
      [GroupBy.Month]: createMonthGroups,
      [GroupBy.Week]: createWeekGroups,
    }[groupBy](dateRange)

    return groups.map(({ title, from, to }) => ({
      title,
      incomes: incomes.filter(({ date }) => date >= from && date < to),
      outcomes: outcomes.filter(({ date }) => date >= from && date < to),
    }))
  }
}
