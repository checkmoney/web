import { ApiModelPropertyOptional } from '@nestjs/swagger'

import { Profile } from '@back/user/domain/Profile.vo'
import { ProfileModel } from '@shared/models/user/ProfileModel'
import { Currency } from '@shared/enum/Currency'

export class ProfileResponse implements ProfileModel {
  public static fromProfile(profile: Profile): ProfileResponse {
    return {
      name: profile.name.getOrElse(undefined),
      currency: profile.currency,
    }
  }

  @ApiModelPropertyOptional({
    example: { name: 'Nick', currency: Currency.EUR },
  })
  public readonly name?: string
  public currency?: Currency
}
