import { Injectable } from '@nestjs/common';
import { Context, TelegramActionHandler } from 'nest-telegram';

import { Templating } from '&back/utils/infrastructure/Templating/Templating';

@Injectable()
export class HelpActions {
  public constructor(private readonly templating: Templating) {}

  @TelegramActionHandler({ command: '/help' })
  public async income(ctx: Context) {
    const responseText = await this.templating.render('telegram/help', {});

    await ctx.reply(responseText);
  }
}
