import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ParseDateRangePipe } from './presentation/http/pipes/dateRange/ParseDateRangePipe'

@Module({
  providers: [ParseDateRangePipe],
  exports: [ParseDateRangePipe],
})
export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
