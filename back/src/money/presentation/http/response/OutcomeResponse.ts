import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

import { Currency } from '@shared/enum/Currency'
import { OutcomeModel } from '@shared/models/money/OutcomeModel'

export class OutcomeResponse implements OutcomeModel {
  @ApiModelProperty({ example: 1000 })
  public readonly amount: number

  @ApiModelProperty({ example: Currency.RUB, enum: Object.values(Currency) })
  public readonly currency: Currency

  @ApiModelProperty({ example: 'Restaurants' })
  public readonly category: string

  @ApiModelPropertyOptional({ example: new Date() })
  public readonly date?: Date
}
