import { TelegramErrorHandler, TelegramCatch, Context } from 'nest-telegram';

import { UnexpectedParameterException } from '&back/utils/infrastructure/exception/UnexpectedParameterException';

@TelegramCatch(UnexpectedParameterException)
export class UnexpectedParameterCatcher
  implements TelegramErrorHandler<UnexpectedParameterException> {
  public async catch(ctx: Context, exception: UnexpectedParameterException) {
    await ctx.reply(exception.message);
  }
}
