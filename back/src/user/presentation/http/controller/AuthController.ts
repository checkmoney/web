import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';

import { Authenticator } from '&back/user/application/Authenticator';
import { Registrator } from '&back/user/application/Registrator';
import { SignInProvider } from '&back/user/application/SignInProvider';
import { User } from '&back/user/domain/User.entity';
import { PostNoCreate } from '&back/utils/presentation/http/PostNoCreate';

import { AuthRequest } from '../request/AuthRequest';
import { GoogleBindRequest } from '../request/GoogleBindRequest';
import { TokenResponse } from '../response/TokenResponse';

@Controller('user/auth')
@ApiUseTags('user')
export class AuthController {
  public constructor(
    private readonly registrator: Registrator,
    private readonly authenticator: Authenticator,
    private readonly signInProvider: SignInProvider,
  ) {}

  @PostNoCreate('sign-in')
  @ApiOperation({ title: 'Sign-in by email and password' })
  @ApiOkResponse({ description: 'Valid credentials', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  public async signIn(@Body() request: AuthRequest): Promise<TokenResponse> {
    const { email, password } = request;

    const user = await this.signInProvider.signInByLogin(email, password);

    return this.createResponse(user);
  }

  @Post('sign-up')
  @ApiOperation({ title: 'Sign-up by email and password' })
  @ApiCreatedResponse({ description: 'User created', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'User already exists' })
  public async signUp(@Body() request: AuthRequest): Promise<TokenResponse> {
    const { email, password } = request;

    await this.registrator.signUp(email, password);

    const user = await this.signInProvider.signInByLogin(email, password);

    return this.createResponse(user);
  }

  @Post('google')
  @ApiOperation({ title: 'Sign-up (or sign-in) by google account' })
  @ApiCreatedResponse({ description: 'Success', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid Google payload' })
  async authByGoogle(
    @Body() request: GoogleBindRequest,
  ): Promise<TokenResponse> {
    const user = await this.signInProvider.signInByGoogle(request);

    return this.createResponse(user);
  }

  private async createResponse(user: User): Promise<TokenResponse> {
    const token = await this.authenticator.encode(user);

    return {
      token,
    };
  }
}
