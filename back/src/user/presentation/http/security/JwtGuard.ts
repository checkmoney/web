import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Option } from 'tsoption'

import { Authenticator } from '@back/user/application/Authenticator'

@Injectable()
export class JwtGuard implements CanActivate {
  public constructor(private readonly authenticator: Authenticator) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.getToken(context)

    return this.authenticator.decode(token).then(() => true, () => false)
  }

  private getToken(executionContext: ExecutionContext): string {
    return Option.of(executionContext)
      .map(context => context.switchToHttp())
      .map(httpMod => httpMod.getRequest())
      .map(request => request.headers || {})
      .map(headers => (headers.authorization || '') as string)
      .map(jwtAuth => jwtAuth.split(' ')[1])
      .getOrElse('')
  }
}
