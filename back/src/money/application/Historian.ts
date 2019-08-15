import { Injectable } from '@nestjs/common';
import { min } from 'date-fns';

import { createGroups } from '&back/utils/infrastructure/dateGroups/createGroups';
import { DateRange } from '&back/utils/infrastructure/dto/DateRange';
import { GroupBy } from '&shared/enum/GroupBy';

import { IncomeRepository } from '../domain/IncomeRepository';
import { OutcomeRepository } from '../domain/OutcomeRepository';
import { rangeFilter } from './helpers/rangeFilter';

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
    ]);

    return min(
      income.map(i => i.date).getOrElse(new Date()),
      outcome.map(o => o.date).getOrElse(new Date()),
    );
  }

  public async showGroupedHistory(
    userLogin: string,
    dateRange: DateRange,
    groupBy: GroupBy,
  ) {
    const [incomes, outcomes] = await Promise.all([
      this.incomeRepo.findByRangeForUser(userLogin, dateRange),
      this.outcomeRepo.findByRangeForUser(userLogin, dateRange),
    ]);

    const groups = createGroups(groupBy)(dateRange);

    return groups.map(group => ({
      title: group.title,
      incomes: incomes.filter(rangeFilter(group)),
      outcomes: outcomes.filter(rangeFilter(group)),
    }));
  }
}
