import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { TransactionController } from './presentation/http/controller/TransactionController'

@Module({
  controllers: [TransactionController],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
