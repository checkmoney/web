import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { PostNoCreate } from '@back/utils/presentation/http/PostNoCreate'

import { AuthRequest } from '../request/AuthRequest'
import { TokenResponse } from '../response/TokenResponse'

@Controller('user/auth')
@ApiUseTags('user')
export class AuthController {
  @PostNoCreate('sign-in')
  @ApiOperation({ title: 'Sign-in by email and password' })
  @ApiOkResponse({ description: 'Valid credentials', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  public async signIn(@Body() request: AuthRequest): Promise<TokenResponse> {
    const { email, password } = request

    return {
      token: email + password,
    }
  }

  @Post('sign-up')
  @ApiOperation({ title: 'Sign-up by email and password' })
  @ApiCreatedResponse({ description: 'User created', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'User already exists' })
  public async signUp(@Body() request: AuthRequest): Promise<TokenResponse> {
    const { email, password } = request

    return {
      token: email + password,
    }
  }
}
