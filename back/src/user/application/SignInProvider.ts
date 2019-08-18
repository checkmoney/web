import { Injectable } from '@nestjs/common';

import { EntitySaver } from '&back/db/EntitySaver';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

import { User } from '../domain/User.entity';
import { UserRepository } from '../domain/UserRepository';
import { PasswordEncoder } from '../infrastructure/PasswordEncoder/PasswordEncoder';
import { InvalidCredentialsException } from './exception/InvalidCredentialsException';
import { InvalidSocialRequestException } from './exception/InvalidSocialRequestException';
import { GoogleValidator } from './social/GoogleValidator';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly googleValidator: GoogleValidator,
    private readonly entitySaver: EntitySaver,
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

  async signInByGoogle(profile: GoogleProfile): Promise<User> {
    const [valid, optionalUser] = await Promise.all([
      this.googleValidator.isValid(profile),
      this.userRepo.findOneByGoogle(profile.id),
    ]);

    if (!valid) {
      throw new InvalidSocialRequestException(profile.email, 'Google', profile);
    }

    // okay, user already exist, just sign-in
    if (optionalUser.nonEmpty()) {
      return optionalUser.get();
    }

    const user = new User(`google-${profile.id}`);
    user.attachGoogle(profile.id);

    await this.entitySaver.save(user);

    return user;
  }
}
