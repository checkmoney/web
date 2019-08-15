import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Authenticator } from '&back/user/application/Authenticator';

import { addPayloadToRequest } from './helpers/addPayloadToRequest';
import { getToken } from './helpers/getToken';

@Injectable()
export class JwtGuard implements CanActivate {
  public constructor(private readonly authenticator: Authenticator) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = getToken(context);

    try {
      const payload = await this.authenticator.decode(token);

      addPayloadToRequest(payload, context);

      return true;
    } catch (error) {
      return false;
    }
  }
}
