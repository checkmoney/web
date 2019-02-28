import { Injectable } from '@nestjs/common'
import { TelegramActionHandler, Context } from 'nest-telegram'

@Injectable()
export class AuthActions {
  @TelegramActionHandler({ onStart: true })
  public async hello(ctx: Context) {
    await ctx.reply('lol')
  }
}
