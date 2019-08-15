import { ApiModelProperty } from '@nestjs/swagger';

import { TipAction } from '&shared/enum/TipAction';
import { TipModel } from '&shared/models/mind/TipModel';

export class TipResponse implements TipModel {
  @ApiModelProperty({ example: '1fhkjsdhfsj23' })
  public readonly token: string;

  @ApiModelProperty({ example: new Date() })
  public readonly date: Date;

  @ApiModelProperty({
    example: TipAction.MergeSources,
    enum: Object.values(TipAction),
  })
  public readonly action: TipAction;

  @ApiModelProperty({ example: ['NASA', 'NAsA'] })
  public readonly meta: any;
}
