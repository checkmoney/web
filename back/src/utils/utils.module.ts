import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { IdGenerator } from './infrastructure/IdGenerator/IdGenerator';
import { NanoIdGenerator } from './infrastructure/IdGenerator/NanoIdGenerator';
import { HandlebarsTemplating } from './infrastructure/Templating/HandlebarsTemplating';
import { Templating } from './infrastructure/Templating/Templating';
import { ParseDateRangePipe } from './presentation/http/pipes/dateRange/ParseDateRangePipe';
import { JsonParsePipe } from './presentation/http/pipes/JsonParsePipe';

@Module({
  providers: [
    ParseDateRangePipe,
    JsonParsePipe,
    {
      provide: IdGenerator,
      useClass: NanoIdGenerator,
    },
    {
      provide: Templating,
      useClass: HandlebarsTemplating,
    },
  ],
  exports: [ParseDateRangePipe, IdGenerator, Templating],
})
export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
