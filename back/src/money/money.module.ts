import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { UserModule } from '@back/user/user.module'
import { UtilsModule } from '@back/utils/utils.module'

import { HistoryController } from './presentation/http/controller/HistoryController'
import { StatisticsController } from './presentation/http/controller/StatisticsController'
import { TransactionController } from './presentation/http/controller/TransactionController'

import { Accountant } from './application/Accountant'

@Module({
  imports: [UserModule, UtilsModule],
  controllers: [TransactionController, HistoryController, StatisticsController],
  providers: [Accountant],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
