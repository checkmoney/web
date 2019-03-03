import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { TelegramBot } from 'nest-telegram'

import { ConfigModule } from './config/config.module'
import { DbModule } from './db/db.module'
import { MoneyModule } from './money/money.module'
import { UserModule } from './user/user.module'
import { UtilsModule } from './utils/utils.module'
import { TelegramModule } from './telegram/telegram.module'

import { Configuration } from './config/Configuration'

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
    private readonly config: Configuration,
    private readonly telegramBot: TelegramBot,
    private readonly moduleRef: ModuleRef,
  ) {}

  public configure(consumer: MiddlewareConsumer) {
    this.telegramBot.init(this.moduleRef)

    if (this.config.isProd()) {
      // in prod use webhook
      consumer.apply(
        this.telegramBot.getMiddleware(
          this.config.getStringOrElse('APP_SECRET', 'secret-path'),
        ),
      )
    } else {
      // in dev use long poll
      this.telegramBot.startPolling()
    }
  }
}
