import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ConversationFailedException } from '&back/money/application/exception/ConversationFailedException';

const HTTP_STATUS = 500;

@Catch(ConversationFailedException)
export class ConversationFailedFilter
  implements ExceptionFilter<ConversationFailedException> {
  public static provider() {
    return {
      provide: APP_FILTER,
      useClass: ConversationFailedFilter,
    };
  }

  public catch(exception: ConversationFailedException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    res.status(HTTP_STATUS).json({
      status: HTTP_STATUS,
      message: exception.message,
      ...exception,
    });
  }
}
