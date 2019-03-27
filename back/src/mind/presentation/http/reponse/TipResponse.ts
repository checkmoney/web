import { ApiModelProperty } from '@nestjs/swagger'

import { TipModel } from '@shared/models/mind/TipModel'
import { TipAction } from '@shared/enum/TipAction'

export class TipResponse implements TipModel {
  @ApiModelProperty({ example: new Date() })
  public readonly date: Date

  @ApiModelProperty({ example: 'New version' })
  public readonly theme: string

  @ApiModelProperty({
    example: TipAction.Nothing,
    enum: Object.values(TipAction),
  })
  public readonly action: TipAction
}
