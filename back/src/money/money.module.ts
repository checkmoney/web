import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '&back/user/user.module';
import { UtilsModule } from '&back/utils/utils.module';

import { Accountant } from './application/Accountant';
import { CurrencyConverter } from './application/CurrencyConverter';
import { Historian } from './application/Historian';
import { Statistician } from './application/Statistician';
import { ExchangeRate } from './domain/ExchangeRate.entity';
import { ExchangeRateRepository } from './domain/ExchangeRateRepository';
import { Income } from './domain/Income.entity';
import { IncomeRepository } from './domain/IncomeRepository';
import { Outcome } from './domain/Outcome.entity';
import { OutcomeRepository } from './domain/OutcomeRepository';
import { ExchangeRateApi } from './insfrastructure/ExchangeRateApi/ExchangeRateApi';
import { HistoryController } from './presentation/http/controller/HistoryController';
import { StatisticsController } from './presentation/http/controller/StatisticsController';
import { TransactionController } from './presentation/http/controller/TransactionController';
import { TransactionActions } from './presentation/telegram/actions/TransactionActions';
import { UnexpectedParameterCatcher } from './presentation/telegram/catcher/UnexpectedParameterCatcher';
import { ConversationFailedFilter } from './presentation/http/filter/ConversationFailedFilter';
import { ApiClientUnity } from './insfrastructure/ExchangeRateApi/ApiClientUnity';

@Module({
  imports: [
    UserModule,
    UtilsModule,
    TypeOrmModule.forFeature([Income, Outcome, ExchangeRate]),
  ],
  controllers: [TransactionController, HistoryController, StatisticsController],
  providers: [
    ConversationFailedFilter.provider(),
    Accountant,
    Historian,
    Statistician,
    IncomeRepository,
    OutcomeRepository,
    CurrencyConverter,
    {
      provide: ExchangeRateApi,
      useClass: ApiClientUnity,
    },
    ExchangeRateRepository,
    TransactionActions,
    UnexpectedParameterCatcher,
  ],
  exports: [IncomeRepository, OutcomeRepository, Statistician, Historian],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
