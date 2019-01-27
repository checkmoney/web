import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

import { Currency } from '@shared/enum/Currency'
import { IncomeModel } from '@shared/models/money/IncomeModel'

export class IncomeResponse implements IncomeModel {
  @ApiModelProperty({ example: 1000 })
  public readonly amount: number

  @ApiModelProperty({ example: Currency.RUB })
  public readonly currency: Currency

  @ApiModelProperty({ example: 'NASA' })
  public readonly source: string

  @ApiModelPropertyOptional({ example: '2019-02-10' })
  public readonly date?: string
}
