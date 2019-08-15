import { ApiModelProperty } from '@nestjs/swagger';

import { Profile } from '&back/user/domain/Profile.vo';
import { Currency } from '&shared/enum/Currency';
import { ProfileModel } from '&shared/models/user/ProfileModel';

export class ProfileResponse implements ProfileModel {
  public static fromProfile(profile: Profile): ProfileResponse {
    return {
      defaultCurrency: profile.defaultCurrency,
      weekStartsOnMonday: profile.weekStartsOnMonday,
    };
  }

  @ApiModelProperty({
    example: Currency.EUR,
    enum: Object.values(Currency),
  })
  public readonly defaultCurrency: Currency;

  @ApiModelProperty({
    example: true,
  })
  public readonly weekStartsOnMonday: boolean;
}
