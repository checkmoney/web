import { ApiModelPropertyOptional } from '@nestjs/swagger'

import { ProfileModel } from '@shared/models/user/ProfileModel'

export class ProfileResponse implements ProfileModel {
  @ApiModelPropertyOptional({ example: 'Nick' })
  public readonly name?: string
}
