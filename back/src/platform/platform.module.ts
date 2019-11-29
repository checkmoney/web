import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '&back/config/config.module';

import { MrSolomons } from './MrSolomons';

@Module({
  imports: [ConfigModule],
  providers: [MrSolomons],
  exports: [MrSolomons],
})
export class PlatformModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
