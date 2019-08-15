import { TelegramErrorHandler, TelegramCatch, Context } from 'nest-telegram';

import { InvalidCredentialsException } from '&back/user/application/exception/InvalidCredentialsException';

@TelegramCatch(InvalidCredentialsException)
export class InvalidCredentialsCatcher
  implements TelegramErrorHandler<InvalidCredentialsException> {
  public async catch(ctx: Context) {
    await ctx.reply('Invalid credentials');
  }
}
