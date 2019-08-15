import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { InvalidCredentialsException } from '&back/user/application/exception/InvalidCredentialsException';

const HTTP_STATUS = 400;

@Catch(InvalidCredentialsException)
export class InvalidCredentialsFilter implements ExceptionFilter {
  public static provider() {
    return {
      provide: APP_FILTER,
      useClass: InvalidCredentialsFilter,
    };
  }

  public catch(exception: InvalidCredentialsException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    res.status(HTTP_STATUS).json({
      status: HTTP_STATUS,
      message: exception.message,
      login: exception.login,
      password: exception.password,
    });
  }
}
