import { ApiModelProperty } from '@nestjs/swagger';

import { CustomTipModel } from '&shared/models/mind/CustomTipModel';

export class CustomTipRequest implements CustomTipModel {
  @ApiModelProperty({ example: 'Alert' })
  public readonly title: string;

  @ApiModelProperty({ example: 'All cool' })
  public readonly text: string;

  @ApiModelProperty({ example: 'https://google.com', required: false })
  public readonly link?: string;

  @ApiModelProperty({ example: new Date() })
  public readonly expireAt: Date;

  @ApiModelProperty({ example: true })
  public readonly important: boolean;
}
