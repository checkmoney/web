import { Body, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';

import { SocialBinder } from '&back/user/application/SocialBinder';
import { PostNoCreate } from '&back/utils/presentation/http/PostNoCreate';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { CurrentUser } from '../decorator/CurrentUser';
import { GoogleBindRequest } from '../request/GoogleBindRequest';
import { OnlyForUsers } from '../security/OnlyForUsers';

@Controller('user/bind')
@ApiUseTags('user')
@OnlyForUsers()
export class SocialController {
  public constructor(private readonly binder: SocialBinder) {}

  @PostNoCreate('google')
  @ApiOperation({ title: 'Bind Google profile to exist user account' })
  @ApiOkResponse({ description: 'Valid request', type: GoogleBindRequest })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  public async signIn(
    @Body() request: GoogleBindRequest,
    @CurrentUser() { login }: TokenPayloadModel,
  ): Promise<void> {
    await this.binder.bindGoogle(login, request);
  }
}
