import { Injectable } from '@nestjs/common';
import * as deepEqual from 'fast-deep-equal';
import { OAuth2Client } from 'google-auth-library';

import { Configuration } from '&back/config/Configuration';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

@Injectable()
export class GoogleValidator {
  private readonly client: OAuth2Client;
  private readonly googleClientId: string;

  constructor(config: Configuration) {
    this.googleClientId = config.getStringOrThrow('GOOGLE_CLIENT_ID');

    const googleClientSecret = config.getStringOrThrow('GOOGLE_CLIENT_SECRET');

    this.client = new OAuth2Client(this.googleClientId, googleClientSecret);
  }

  async isValid(profile: GoogleProfile): Promise<boolean> {
    const { token } = profile;

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: profile.token,
        audience: this.googleClientId,
      });

      const payload = ticket.getPayload();

      const payloadProfile: GoogleProfile = {
        token,
        name: payload.name,
        id: payload.sub,
        photo: payload.picture,
        email: payload.email,
      };

      return deepEqual(profile, payloadProfile);
    } catch (error) {
      return false;
    }
  }
}
