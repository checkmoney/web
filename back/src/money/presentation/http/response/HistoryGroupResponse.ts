import { ApiModelProperty } from '@nestjs/swagger'

import { Currency } from '@shared/enum/Currency'
import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'

import { IncomeResponse } from './IncomeResponse'
import { OutcomeResponse } from './OutcomeResponse'

const incomesExample: IncomeResponse[] = [
  {
    amount: 1200,
    currency: Currency.RUB,
    source: 'NASA',
    date: '2019-03-22',
  },
]

const outcomeExample: OutcomeResponse[] = [
  {
    amount: 1200,
    currency: Currency.RUB,
    category: 'Cafes',
    date: '2019-03-22',
  },
]

export class HistoryGroupResponse implements HistoryGroupModel {
  @ApiModelProperty({ example: 'Jan' })
  public readonly title: string

  @ApiModelProperty({ example: incomesExample })
  public readonly incomes: IncomeResponse[]

  @ApiModelProperty({ example: outcomeExample })
  public readonly outcomes: OutcomeResponse[]
}
