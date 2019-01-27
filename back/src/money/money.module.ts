import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { HistoryController } from './presentation/http/controller/HIstoryController'
import { TransactionController } from './presentation/http/controller/TransactionController'

@Module({
  controllers: [TransactionController, HistoryController],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
