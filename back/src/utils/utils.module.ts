import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { IdGenerator } from './infrastructure/IdGenerator/IdGenerator'
import { NanoIdGenerator } from './infrastructure/IdGenerator/NanoIdGenerator'
import { ParseDateRangePipe } from './presentation/http/pipes/dateRange/ParseDateRangePipe'
import { Templating } from './infrastructure/Templating/Templating'
import { HandlebarsTemplating } from './infrastructure/Templating/HandlebarsTemplating'

@Module({
  providers: [
    ParseDateRangePipe,
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
