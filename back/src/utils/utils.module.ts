import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import FilterProviderFactory from './presentation/http/filter/FilterProviderFactory'
import UnexpectedParameterFilter from './presentation/http/filter/UnexpectedParameterFilter'
import { ParseDateRangePipe } from './presentation/http/pipes/dateRange/ParseDateRangePipe'

@Module({
  providers: [
    ParseDateRangePipe,
    FilterProviderFactory.provider(UnexpectedParameterFilter),
  ],
})
export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
