import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TelegramBot } from 'nest-telegram';

import { ConfigModule } from './config/config.module';
import { Configuration } from './config/Configuration';
import { DbModule } from './db/db.module';
import { MindModule } from './mind/mind.module';
import { MoneyModule } from './money/money.module';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    UserModule,
    MoneyModule,
    UtilsModule,
    ConfigModule,
    DbModule,
    TelegramModule,
    MindModule,
  ],
})
export class AppModule implements NestModule {
  public constructor(
    private readonly config: Configuration,
    private readonly telegramBot: TelegramBot,
    private readonly moduleRef: ModuleRef,
  ) {}

  public configure(consumer: MiddlewareConsumer) {
    this.telegramBot.init(this.moduleRef);

    if (this.config.isDev()) {
      // in dev use long poll
      // this.telegramBot.startPolling();
    }
  }
}
