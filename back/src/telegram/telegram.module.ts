import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import {
  TelegramModule as OriginalTelegramModule,
  TelegramBot,
} from 'nest-telegram'

import { ConfigModule } from '@back/config/config.module'

import { TelegramOptionsFactory } from './TelegramOptionsFactory'

@Module({
  imports: [
    OriginalTelegramModule.fromFactory({
      imports: [ConfigModule],
      useClass: TelegramOptionsFactory,
    }),
  ],
  providers: [TelegramOptionsFactory],
  exports: [OriginalTelegramModule],
})
export class TelegramModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
