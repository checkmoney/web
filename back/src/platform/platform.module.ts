import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MrSolomons } from '@checkmoney/soap-opera';

import { ConfigModule } from '&back/config/config.module';

import { mrSolomonsProvider } from './mrSolomonsProvider';

@Module({
  imports: [ConfigModule],
  providers: [mrSolomonsProvider],
  exports: [MrSolomons],
})
export class PlatformModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
