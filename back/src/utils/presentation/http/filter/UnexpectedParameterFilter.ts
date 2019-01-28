import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

import { UnexpectedParameterException } from '@back/utils/infrastructure/exception/UnexpectedParameterException'

const HTTP_STATUS = 400

@Catch(UnexpectedParameterException)
export default class UnexpectedParameterFilter implements ExceptionFilter {
  public catch(exception: UnexpectedParameterException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse()

    res.status(HTTP_STATUS).json({
      status: HTTP_STATUS,
      message: exception.message,
    })
  }
}
