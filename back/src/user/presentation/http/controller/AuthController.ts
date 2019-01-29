import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { Authenticator } from '@back/user/application/Authenticator'
import { Registrator } from '@back/user/application/Registrator'
import { PostNoCreate } from '@back/utils/presentation/http/PostNoCreate'

import { AuthRequest } from '../request/AuthRequest'
import { TokenResponse } from '../response/TokenResponse'

@Controller('user/auth')
@ApiUseTags('user')
export class AuthController {
  public constructor(
    private readonly registrator: Registrator,
    private readonly authenticator: Authenticator,
  ) {}

  @PostNoCreate('sign-in')
  @ApiOperation({ title: 'Sign-in by email and password' })
  @ApiOkResponse({ description: 'Valid credentials', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  public async signIn(@Body() request: AuthRequest): Promise<TokenResponse> {
    const { email, password } = request

    return this.createResponseByCredentials(email, password)
  }

  @Post('sign-up')
  @ApiOperation({ title: 'Sign-up by email and password' })
  @ApiCreatedResponse({ description: 'User created', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'User already exists' })
  public async signUp(@Body() request: AuthRequest): Promise<TokenResponse> {
    const { email, password } = request

    await this.registrator.signUp(email, password)

    return this.createResponseByCredentials(email, password)
  }

  private async createResponseByCredentials(
    login: string,
    password: string,
  ): Promise<TokenResponse> {
    const token = await this.authenticator.signIn(login, password)

    return {
      token,
    }
  }
}
