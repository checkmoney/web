import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '@back/user/user.module'
import { UtilsModule } from '@back/utils/utils.module'

import { Accountant } from './application/Accountant'
import { CurrencyConverter } from './application/CurrencyConverter'
import { Historian } from './application/Historian'
import { Statistician } from './application/Statistician'
import { ExchangeRate } from './domain/ExchangeRate.entity'
import { ExchangeRateRepository } from './domain/ExchangeRateRepository'
import { Income } from './domain/Income.entity'
import { IncomeRepository } from './domain/IncomeRepository'
import { Outcome } from './domain/Outcome.entity'
import { OutcomeRepository } from './domain/OutcomeRepository'
import { ExchangeRateApi } from './insfrastructure/ExchangeRateApi'
import { HistoryController } from './presentation/http/controller/HistoryController'
import { StatisticsController } from './presentation/http/controller/StatisticsController'
import { TransactionController } from './presentation/http/controller/TransactionController'
import { TransactionActions } from './presentation/telegram/actions/TransactionActions'
import { UnexpectedParameterCatcher } from './presentation/telegram/catcher/UnexpectedParameterCatcher'

@Module({
  imports: [
    UserModule,
    UtilsModule,
    TypeOrmModule.forFeature([Income, Outcome, ExchangeRate]),
  ],
  controllers: [TransactionController, HistoryController, StatisticsController],
  providers: [
    Accountant,
    Historian,
    Statistician,
    IncomeRepository,
    OutcomeRepository,
    CurrencyConverter,
    ExchangeRateApi,
    ExchangeRateRepository,
    TransactionActions,
    UnexpectedParameterCatcher,
  ],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
