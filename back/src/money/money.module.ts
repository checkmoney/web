import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { HistoryController } from './presentation/http/controller/HistoryController'
import { StatisticsController } from './presentation/http/controller/StatisticsController'
import { TransactionController } from './presentation/http/controller/TransactionController'

@Module({
  controllers: [TransactionController, HistoryController, StatisticsController],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
