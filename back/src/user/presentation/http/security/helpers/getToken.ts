import { ExecutionContext } from '@nestjs/common';
import { Option } from 'tsoption';

export const getToken = (executionContext: ExecutionContext) => {
  return Option.of(executionContext)
    .map(context => context.switchToHttp())
    .map(httpMod => httpMod.getRequest())
    .map(request => request.headers || {})
    .map(headers => (headers.authorization || '') as string)
    .map(jwtAuth => jwtAuth.split(' ')[1])
    .getOrElse('');
};
