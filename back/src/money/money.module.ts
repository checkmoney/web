import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '@back/user/user.module'
import { UtilsModule } from '@back/utils/utils.module'

import { Accountant } from './application/Accountant'
import { Historian } from './application/Historian'
import { Income } from './domain/Income.entity'
import { IncomeRepository } from './domain/IncomeRepository'
import { Outcome } from './domain/Outcome.entity'
import { OutcomeRepository } from './domain/OutcomeRepository'
import { HistoryController } from './presentation/http/controller/HistoryController'
import { StatisticsController } from './presentation/http/controller/StatisticsController'
import { TransactionController } from './presentation/http/controller/TransactionController'

@Module({
  imports: [
    UserModule,
    UtilsModule,
    TypeOrmModule.forFeature([Income, Outcome]),
  ],
  controllers: [TransactionController, HistoryController, StatisticsController],
  providers: [Accountant, Historian, IncomeRepository, OutcomeRepository],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
