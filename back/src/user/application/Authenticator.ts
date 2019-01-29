import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../domain/User.entity'
import { UserRepository } from '../domain/UserRepository'
import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder'
import { TokenPayload } from './dto/TokenPayload'
import { InvalidCredentialsException } from './exception/InvalidCredentialsException'
import { InvalidTokenException } from './exception/InvalidTokenException'

@Injectable()
export class Authenticator {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly jwt: JwtService,
  ) {}

  public async decode(token: string): Promise<TokenPayload> {
    try {
      this.jwt.verify(token)

      return this.jwt.decode(token) as TokenPayload
    } catch (e) {
      // token is invalid
      throw new InvalidTokenException(token)
    }
  }

  public async signIn(login: string, password: string): Promise<string> {
    const user = await this.userRepo.getOne(login)
    const passwordValid = await user.isPasswordValid(
      password,
      this.passwordEncoder,
    )

    if (!passwordValid) {
      throw new InvalidCredentialsException(login, password)
    }

    const payload = this.createTokenPayload(user)
    const token = this.jwt.sign(payload)

    return token
  }

  private createTokenPayload(user: User): TokenPayload {
    return {
      login: user.login,
    }
  }
}
