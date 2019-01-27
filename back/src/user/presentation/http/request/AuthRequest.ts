import { ApiModelProperty } from '@nestjs/swagger'

export class AuthRequest {
  @ApiModelProperty({ example: 'email@email.com' })
  public readonly email: string

  @ApiModelProperty({ example: 'Pas$w0rd' })
  public readonly password: string
}
