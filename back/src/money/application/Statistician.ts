import { Injectable } from '@nestjs/common';

import { createGroups } from '&back/utils/infrastructure/dateGroups/createGroups';
import { DateRange } from '&back/utils/infrastructure/dto/DateRange';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';

import { Transaction } from '../domain/dto/Transaction';
import { IncomeRepository } from '../domain/IncomeRepository';
import { AbstractTransaction } from '../domain/interfaces/AbstarctTransaction';
import { OutcomeRepository } from '../domain/OutcomeRepository';
import { CurrencyConverter } from './CurrencyConverter';
import { amountMapper } from './helpers/amountMapper';
import { rangeFilter } from './helpers/rangeFilter';
import { sumReducer } from './helpers/sumReducer';

@Injectable()
export class Statistician {
  public constructor(
    private readonly outcomeRepo: OutcomeRepository,
    private readonly incomeRepo: IncomeRepository,
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
    ]);

    const [convertedIncomes, convertedOutcomes] = await Promise.all([
      this.convertItems(currency)(incomes),
      this.convertItems(currency)(outcomes),
    ]);

    const groups = createGroups(statsGroupBy)(dateRange);

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
    }));
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
          );

          return new Transaction(newAmount, targetCurrency, item.date);
        }),
      );
  }
}
