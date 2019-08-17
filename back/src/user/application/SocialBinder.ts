import { Injectable } from '@nestjs/common';

import { EntitySaver } from '&back/db/EntitySaver';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

import { UserRepository } from '../domain/UserRepository';
import { InvalidSocialRequestException } from './exception/InvalidSocialRequestException';
import { LoginAlreadyTakenException } from './exception/LoginAlreadyTakenException';
import { GoogleValidator } from './social/GoogleValidator';

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

  async bindTelegram(login: string, telegramId: number) {
    const attachedUser = await this.userRepo.findOneByTelegram(telegramId);

    if (attachedUser.nonEmpty()) {
      throw new LoginAlreadyTakenException(login);
    }

    const user = await this.userRepo.getOne(login);

    user.attachTelegram(telegramId);

    await this.entitySaver.save(user);
  }
}
