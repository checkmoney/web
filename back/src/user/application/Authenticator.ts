import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../domain/User.entity'
import { UserRepository } from '../domain/UserRepository'
import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder'
import { TokenPayload } from './dto/TokenPatload'

@Injectable()
export class Authenticator {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly jwt: JwtService,
  ) {}

  public async signIn(login: string, password: string): Promise<string> {
    const user = await this.userRepo.getOne(login)
    const passwordValid = await user.isPasswordValid(
      password,
      this.passwordEncoder,
    )

    if (!passwordValid) {
      // TODO: throw exception
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
