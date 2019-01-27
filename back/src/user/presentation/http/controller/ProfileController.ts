import { Body, Controller, Get } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { PostNoCreate } from '@back/utils/http/PostNoCreate'

import { ProfileRequest } from '../request/ProfileRequest'
import { ProfileResponse } from '../response/ProfileResponse'

@Controller('user/profile')
@ApiUseTags('user')
@ApiBearerAuth()
export class ProfileController {
  @Get()
  @ApiOperation({ title: 'Show user profile' })
  @ApiOkResponse({
    description: 'Fetching profile success',
    type: ProfileResponse,
  })
  public async showProfile(): Promise<ProfileResponse> {
    return {}
  }

  @PostNoCreate()
  @ApiOperation({ title: 'Edit user profile' })
  @ApiOkResponse({
    description: 'Editing profile success',
    type: ProfileResponse,
  })
  public async editProfile(
    @Body() request: ProfileRequest,
  ): Promise<ProfileResponse> {
    const { name } = request

    return {
      name,
    }
  }
}
