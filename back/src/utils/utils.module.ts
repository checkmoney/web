import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ParseDateRangePipe } from './presentation/http/pipes/dateRange/ParseDateRangePipe'

@Module({
  providers: [ParseDateRangePipe],
})
export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
