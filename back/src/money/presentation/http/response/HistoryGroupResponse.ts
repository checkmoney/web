import { ApiModelProperty } from '@nestjs/swagger';

import { Income } from '&back/money/domain/Income.entity';
import { Outcome } from '&back/money/domain/Outcome.entity';
import { Currency } from '&shared/enum/Currency';
import { HistoryGroupModel } from '&shared/models/money/HistoryGroupModel';

import { IncomeResponse } from './IncomeResponse';
import { OutcomeResponse } from './OutcomeResponse';

const incomesExample: IncomeResponse[] = [
  {
    amount: 1200,
    currency: Currency.RUB,
    source: 'NASA',
    date: new Date(),
  },
];

const outcomeExample: OutcomeResponse[] = [
  {
    amount: 1200,
    currency: Currency.RUB,
    category: 'Cafes',
    date: new Date(),
  },
];

export class HistoryGroupResponse implements HistoryGroupModel {
  public static fromPair(
    title: string,
    incomes: Income[],
    outcomes: Outcome[],
  ): HistoryGroupModel {
    return {
      title,
      incomes: incomes.map(IncomeResponse.fromEntity),
      outcomes: outcomes.map(OutcomeResponse.fromEntity),
    };
  }

  @ApiModelProperty({ example: 'Jan' })
  public readonly title: string;

  @ApiModelProperty({ example: incomesExample })
  public readonly incomes: IncomeResponse[];

  @ApiModelProperty({ example: outcomeExample })
  public readonly outcomes: OutcomeResponse[];
}
