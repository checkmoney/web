import { Injectable } from '@nestjs/common';
import { User } from '../domain/User.entity';
import { UserRepository } from '../domain/UserRepository';
import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder';
import { InvalidCredentialsException } from './exception/InvalidCredentialsException';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async signInByLogin(login: string, password: string): Promise<User> {
    const user = await this.userRepo.getOne(login);

    const passwordValid = await user.isPasswordValid(
      password,
      this.passwordEncoder,
    );

    if (!passwordValid) {
      throw new InvalidCredentialsException(login, password);
    }

    return user;
  }
}
