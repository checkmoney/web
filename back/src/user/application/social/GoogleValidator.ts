import { Injectable } from '@nestjs/common';
import * as deepEqual from 'fast-deep-equal';
import { OAuth2Client } from 'google-auth-library';
import { sample } from 'lodash';

import { Configuration } from '&back/config/Configuration';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

@Injectable()
export class GoogleValidator {
  private readonly client: OAuth2Client;
  private readonly googleClientIds: string[];

  constructor(config: Configuration) {
    this.googleClientIds = [
      config.getStringOrThrow('GOOGLE_CLIENT_ID_WEB'),
      config.getStringOrThrow('GOOGLE_CLIENT_ID_IOS'),
      config.getStringOrThrow('GOOGLE_CLIENT_ID_ANDROID'),
    ];

    const anyClientId = sample(this.googleClientIds);
    const googleClientSecret = config.getStringOrThrow('GOOGLE_CLIENT_SECRET');

    this.client = new OAuth2Client(anyClientId, googleClientSecret);
  }

  async isValid(profile: GoogleProfile): Promise<boolean> {
    const { token } = profile;

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: profile.token,
        audience: this.googleClientIds,
      });

      const payload = ticket.getPayload();

      const payloadProfile: GoogleProfile = {
        token,
        name: payload.name,
        id: payload.sub,
        photo: payload.picture,
        email: payload.email,
      };

      return deepEqual(
        this.clearProfile(profile),
        this.clearProfile(payloadProfile),
      );
    } catch (error) {
      return false;
    }
  }

  private clearProfile({ photo, ...profile }: GoogleProfile) {
    return {
      ...profile,
      photo: photo.replace(/(=.+)/, ''), // remove image size options from URL
    };
  }
}
