import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { TelegramBot } from 'nest-telegram'

import { ConfigModule } from './config/config.module'
import { DbModule } from './db/db.module'
import { MoneyModule } from './money/money.module'
import { UserModule } from './user/user.module'
import { UtilsModule } from './utils/utils.module'
import { TelegramModule } from './telegram/telegram.module'

@Module({
  imports: [
    UserModule,
    MoneyModule,
    UtilsModule,
    ConfigModule,
    DbModule,
    TelegramModule,
  ],
})
export class AppModule implements NestModule {
  public constructor(
    private readonly telegramBot: TelegramBot,
    private readonly moduleRef: ModuleRef,
  ) {}

  public configure(consumer: MiddlewareConsumer) {
    this.telegramBot.init(this.moduleRef)
    this.telegramBot.start()
  }
}
