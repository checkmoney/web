import { ApiModelProperty } from '@nestjs/swagger'

import { Currency } from '$shared/enum/Currency'
import { SourceGroupIncomeModel } from '$shared/models/money/SourceGroupIncomeModel'

export class SourceGroupIncomeResponse implements SourceGroupIncomeModel {
  @ApiModelProperty({ example: 'NASA' })
  public readonly source: string

  @ApiModelProperty({ example: 20000 })
  public readonly income: number

  @ApiModelProperty({ example: Currency.RUB, enum: Object.values(Currency) })
  public readonly currency: Currency
}
