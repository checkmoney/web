import { ApiModelProperty } from '@nestjs/swagger';

import { DisableTipModel } from '&shared/models/mind/DisableTipModel';

export class DisableTipRequest implements DisableTipModel {
  @ApiModelProperty({ example: ['1fhkjsdhfsj23', 'fsdfdshk2'] })
  public readonly tokens: string[];
}
