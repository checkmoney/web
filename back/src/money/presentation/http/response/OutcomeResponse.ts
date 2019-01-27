import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

import { Currency } from '@shared/enum/Currency'
import { OutcomeModel } from '@shared/models/money/OutcomeModel'

export class OutcomeResponse implements OutcomeModel {
  @ApiModelProperty({ example: 1000 })
  public readonly amount: number

  @ApiModelProperty({ example: Currency.RUB })
  public readonly currency: Currency

  @ApiModelProperty({ example: 'Restaurants' })
  public readonly category: string

  @ApiModelPropertyOptional({ example: '2019-02-10' })
  public readonly date?: string
}
