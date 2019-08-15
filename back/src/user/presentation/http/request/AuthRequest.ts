import { ApiModelProperty } from '@nestjs/swagger';

import { AuthModel } from '&shared/models/user/AuthModel';

export class AuthRequest implements AuthModel {
  @ApiModelProperty({ example: 'email@email.com' })
  public readonly email: string;

  @ApiModelProperty({ example: 'Pas$w0rd' })
  public readonly password: string;
}
