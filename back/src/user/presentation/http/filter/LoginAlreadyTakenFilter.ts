import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { LoginAlreadyTakenException } from '&back/user/application/exception/LoginAlreadyTakenException';

const HTTP_STATUS = 400;

@Catch(LoginAlreadyTakenException)
export class LoginAlreadyTakenFilter implements ExceptionFilter {
  public static provider() {
    return {
      provide: APP_FILTER,
      useClass: LoginAlreadyTakenFilter,
    };
  }

  public catch(exception: LoginAlreadyTakenException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    res.status(HTTP_STATUS).json({
      status: HTTP_STATUS,
      message: exception.message,
      login: exception.login,
    });
  }
}
