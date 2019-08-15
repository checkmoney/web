import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';

import { ProfileEditor } from '&back/user/application/ProfileEditor';
import { UserRepository } from '&back/user/domain/UserRepository';
import { JsonParsePipe } from '&back/utils/presentation/http/pipes/JsonParsePipe';
import { PostNoCreate } from '&back/utils/presentation/http/PostNoCreate';
import { Currency } from '&shared/enum/Currency';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { CurrentUser } from '../decorator/CurrentUser';
import { ProfileResponse } from '../response/ProfileResponse';
import { OnlyForUsers } from '../security/OnlyForUsers';

@Controller('user/profile')
@OnlyForUsers()
@ApiUseTags('user')
@ApiBearerAuth()
export class ProfileController {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly profileEditor: ProfileEditor,
  ) {}

  @Get()
  @ApiOperation({ title: 'Show user profile' })
  @ApiOkResponse({
    description: 'Fetching profile success',
    type: ProfileResponse,
  })
  public async showProfile(@CurrentUser()
  {
    login,
  }: TokenPayloadModel): Promise<ProfileResponse> {
    const user = await this.userRepo.getOne(login);

    return ProfileResponse.fromProfile(user.profile);
  }

  @PostNoCreate('/set-currency/:currency')
  @ApiOperation({ title: 'Set default currency' })
  @ApiOkResponse({ description: 'Ok' })
  public async setDefaultCurrency(
    @Param('currency') currency: Currency,
    @CurrentUser() user: TokenPayloadModel,
  ): Promise<void> {
    await this.profileEditor.changeCurrency(user.login, currency);
  }

  @PostNoCreate('/set-week-start/:onMonday')
  @ApiOperation({ title: 'Set week start' })
  @ApiOkResponse({ description: 'Ok' })
  public async setWeekStartsOnMonday(
    @Param('onMonday', JsonParsePipe) onMonday: boolean,
    @CurrentUser() user: TokenPayloadModel,
  ): Promise<void> {
    await this.profileEditor.changeWeekStart(user.login, onMonday);
  }
}
