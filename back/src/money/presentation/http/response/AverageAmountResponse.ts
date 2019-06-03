import { ApiModelProperty } from '@nestjs/swagger'

import { Currency } from '$shared/enum/Currency'
import { AverageAmountModel } from '$shared/models/money/AvergaeAmountModel'

export class AverageAmountResponse implements AverageAmountModel {
  @ApiModelProperty({ example: '2018' })
  public readonly period: string

  @ApiModelProperty({ example: 13000 })
  public readonly income: number

  @ApiModelProperty({ example: 3000 })
  public readonly outcome: number

  @ApiModelProperty({ example: Currency.RUB, enum: Object.values(Currency) })
  public readonly currency: Currency
}
