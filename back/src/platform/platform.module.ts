import { MrSolomons, DrKhomyuk, DetBell } from '@checkmoney/soap-opera';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '&back/config/config.module';

import { detBellProvider } from './detBellProvider';
import { drKhomyukProvider } from './drKhomyukProvider';
import { mrSolomonsProvider } from './mrSolomonsProvider';

@Module({
  imports: [ConfigModule],
  providers: [mrSolomonsProvider, drKhomyukProvider, detBellProvider],
  exports: [MrSolomons, DrKhomyuk, DetBell],
})
export class PlatformModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
