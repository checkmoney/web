import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { IdGenerator } from './infrastructure/IdGenerator/IdGenerator'
import { NanoIdGenerator } from './infrastructure/IdGenerator/NanoIdGenerator'
import { ParseDateRangePipe } from './presentation/http/pipes/dateRange/ParseDateRangePipe'

@Module({
  providers: [
    ParseDateRangePipe,
    {
      provide: IdGenerator,
      useClass: NanoIdGenerator,
    },
  ],
  exports: [ParseDateRangePipe, IdGenerator],
})
export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
