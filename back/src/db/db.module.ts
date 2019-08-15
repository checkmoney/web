import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '&back/config/config.module';

import { DbOptionsFactory } from './DbOptionsFactory';
import { EntitySaver } from './EntitySaver';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DbOptionsFactory,
    }),
  ],
  providers: [EntitySaver],
  exports: [EntitySaver],
})
export class DbModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
