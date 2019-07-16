import { ApiModelProperty } from '@nestjs/swagger'

import { Currency } from '&shared/enum/Currency'
import { CategoryGroupOutcomeModel } from '&shared/models/money/CategoryGroupOutcomeModel'

export class CategoryGroupOutcomeResponse implements CategoryGroupOutcomeModel {
  @ApiModelProperty({ example: 'NASA' })
  public readonly category: string

  @ApiModelProperty({ example: 20000 })
  public readonly outcome: number

  @ApiModelProperty({ example: Currency.RUB, enum: Object.values(Currency) })
  public readonly currency: Currency
}
