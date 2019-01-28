import { ApiModelProperty } from '@nestjs/swagger'

import { Currency } from '@shared/enum/Currency'
import { DateGroupModel } from '@shared/models/money/DateGroupModel'

export class DateGroupResponse implements DateGroupModel {
  @ApiModelProperty({ example: 'Jan 2019' })
  public readonly start: string

  @ApiModelProperty({ example: 'Feb 2019' })
  public readonly end: string

  @ApiModelProperty({ example: 12000 })
  public readonly income: number

  @ApiModelProperty({ example: 3000 })
  public readonly outcome: number

  @ApiModelProperty({ example: Currency.RUB, enum: Object.values(Currency) })
  public readonly currency: Currency
}
