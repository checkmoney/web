import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { User } from '../domain/User.entity';
import { UserRepository } from '../domain/UserRepository';
import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder';
import { InvalidCredentialsException } from './exception/InvalidCredentialsException';
import { InvalidTokenException } from './exception/InvalidTokenException';

@Injectable()
export class Authenticator {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly jwt: JwtService,
  ) {}

  public async decode(token: string): Promise<TokenPayloadModel> {
    try {
      this.jwt.verify(token);

      return this.jwt.decode(token) as TokenPayloadModel;
    } catch (error) {
      // token is invalid
      throw new InvalidTokenException(token);
    }
  }

  public async encode(user: User): Promise<string> {
    const payload: TokenPayloadModel = {
      login: user.login,
      isManager: user.isManager,
    };

    return this.jwt.sign(payload);
  }
}
