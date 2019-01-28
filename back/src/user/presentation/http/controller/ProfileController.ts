import { Body, Controller, Get } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { ProfileEditor } from '@back/user/application/ProfileEditor'
import { UserRepository } from '@back/user/domain/UserRepository'
import { PostNoCreate } from '@back/utils/presentation/http/PostNoCreate'

import { ProfileRequest } from '../request/ProfileRequest'
import { ProfileResponse } from '../response/ProfileResponse'

@Controller('user/profile')
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
  public async showProfile(): Promise<ProfileResponse> {
    return this.getResponseByLogin('email@email.com')
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
    await this.profileEditor.edit('email@email.com', request)

    return this.getResponseByLogin('email@email.com')
  }

  private async getResponseByLogin(login: string): Promise<ProfileResponse> {
    const user = await this.userRepo.getOne(login)

    return ProfileResponse.fromProfile(user.profile)
  }
}
