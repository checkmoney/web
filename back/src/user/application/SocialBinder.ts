import { Injectable } from '@nestjs/common';

import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

import { UserRepository } from '../domain/UserRepository';
import { InvalidSocialRequestException } from './exception/InvalidSocialRequestException';
import { GoogleValidator } from './social/GoogleValidator';
import { EntitySaver } from '&back/db/EntitySaver';

@Injectable()
export class SocialBinder {
  constructor(
    private readonly googleValidator: GoogleValidator,
    private readonly userRepo: UserRepository,
    private readonly entitySaver: EntitySaver,
  ) {}

  async bindGoogle(login: string, profile: GoogleProfile) {
    const [valid, user] = await Promise.all([
      this.googleValidator.isValid(profile),
      this.userRepo.getOne(login),
    ]);

    if (!valid) {
      throw new InvalidSocialRequestException(login, 'Google', profile);
    }

    user.attachGoogle(profile.id);

    await this.entitySaver.save(user);
  }
}
