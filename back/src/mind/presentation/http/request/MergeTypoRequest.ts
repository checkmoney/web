import { ApiModelProperty } from '@nestjs/swagger';

import { MergeTypoModel } from '&shared/models/mind/MergeTypoModel';

export class MergeTypoRequest implements MergeTypoModel {
  @ApiModelProperty({ example: 'Lunch' })
  public readonly primary: string;

  @ApiModelProperty({ example: ['lunch', 'Lonch'] })
  public readonly secondary: string[];
}
