import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlatformModule } from '&back/platform/platform.module';
import { UserModule } from '&back/user/user.module';
import { UtilsModule } from '&back/utils/utils.module';

import { Accountant } from './application/Accountant';
import { CurrencyConverter } from './application/CurrencyConverter';
import { Historian } from './application/Historian';
import { Income } from './domain/Income.entity';
import { IncomeRepository } from './domain/IncomeRepository';
import { Outcome } from './domain/Outcome.entity';
import { OutcomeRepository } from './domain/OutcomeRepository';
import { HistoryController } from './presentation/http/controller/HistoryController';
import { MrButcherController } from './presentation/http/controller/MrButcherController';
import { TransactionController } from './presentation/http/controller/TransactionController';
import { ConversationFailedFilter } from './presentation/http/filter/ConversationFailedFilter';
import { TransactionActions } from './presentation/telegram/actions/TransactionActions';
import { UnexpectedParameterCatcher } from './presentation/telegram/catcher/UnexpectedParameterCatcher';

@Module({
  imports: [
    PlatformModule,
    UserModule,
    UtilsModule,
    TypeOrmModule.forFeature([Income, Outcome]),
  ],
  controllers: [TransactionController, HistoryController, MrButcherController],
  providers: [
    ConversationFailedFilter.provider(),
    Accountant,
    Historian,
    IncomeRepository,
    OutcomeRepository,
    CurrencyConverter,
    TransactionActions,
    UnexpectedParameterCatcher,
  ],
  exports: [IncomeRepository, OutcomeRepository, Historian],
})
export class MoneyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
