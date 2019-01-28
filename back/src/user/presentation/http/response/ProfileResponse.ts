import { ApiModelPropertyOptional } from '@nestjs/swagger'

import { Profile } from '@back/user/domain/Profile.vo'
import { ProfileModel } from '@shared/models/user/ProfileModel'

export class ProfileResponse implements ProfileModel {
  public static fromProfile(profile: Profile): ProfileResponse {
    return {
      name: profile.name.getOrElse(undefined),
    }
  }

  @ApiModelPropertyOptional({ example: 'Nick' })
  public readonly name?: string
}
