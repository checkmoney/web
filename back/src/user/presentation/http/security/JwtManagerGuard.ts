import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Authenticator } from '&back/user/application/Authenticator';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { addPayloadToRequest } from './helpers/addPayloadToRequest';
import { getToken } from './helpers/getToken';

@Injectable()
export class JwtManagerGuard implements CanActivate {
  public constructor(private readonly authenticator: Authenticator) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = getToken(context);

    try {
      const payload: TokenPayloadModel = await this.authenticator.decode(token);

      addPayloadToRequest(payload, context);

      return payload.isManager;
    } catch (error) {
      return false;
    }
  }
}
