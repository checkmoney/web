import { Injectable } from '@nestjs/common';
import { TelegramActionHandler, Context, PipeContext } from 'nest-telegram';

import { Authenticator } from '&back/user/application/Authenticator';
import { SignInProvider } from '&back/user/application/SignInProvider';
import { SocialBinder } from '&back/user/application/SocialBinder';
import { Templating } from '&back/utils/infrastructure/Templating/Templating';

import { IsKnownUser } from '../transformer/IsKnownUser';

@Injectable()
export class AuthActions {
  constructor(
    private readonly authenticator: Authenticator,
    private readonly signInProvider: SignInProvider,
    private readonly templating: Templating,
    private readonly socialBinder: SocialBinder,
  ) {}

  @TelegramActionHandler({ onStart: true })
  public async hello(
    ctx: Context,
    @PipeContext(IsKnownUser) loggedIn: boolean,
  ) {
    const responseText = await this.templating.render('telegram/start', {
      loggedIn,
    });

    await ctx.reply(responseText);
  }

  @TelegramActionHandler({ command: 'auth' })
  public async auth(ctx: Context) {
    const [_, login, password] = ctx.message.text.split(' ');

    const user = await this.signInProvider.signInByLogin(login, password);
    await this.authenticator.encode(user);
    await this.socialBinder.bindTelegram(login, ctx.from.id);
    await ctx.reply('Success');
  }
}
