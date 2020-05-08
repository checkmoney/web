import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbModule } from '&back/db/db.module';
import { MoneyModule } from '&back/money/money.module';
import { PlatformModule } from '&back/platform/platform.module';
import { UserModule } from '&back/user/user.module';

import { BudgetAdviser } from './application/adviser/BudgetAdviser';
import { CustomAdviser } from './application/adviser/CustomAdviser';
import { ExtraSpendingAdviser } from './application/adviser/ExtraSpendingAdviser';
import { PastDaysBudgetAdviser } from './application/adviser/PastDaysBudgetAdviser';
import { RecurrentPaymentAdviser } from './application/adviser/RecurrentPaymentAdviser';
import { TypoAdviser } from './application/adviser/TypoAdviser';
import { TipsCreator } from './application/TipsCreator';
import { TipsDisabler } from './application/TipsDisabler';
import { TipsFilter } from './application/TipsFilter';
import { TypoMerger } from './application/TypoMerger';
import { CustomTip } from './domain/CustomTip.entity';
import { CustomTipRepository } from './domain/CustomTipRepository';
import { DisabledTip } from './domain/DisabledTip.entity';
import { DisabledTipRepository } from './domain/DisabledTipRepository';
import { AdviserUnity } from './infrastructure/adviser/AdviserUnity';
import { TipController } from './presentation/http/controller/TipController';
import { TypoController } from './presentation/http/controller/TypoController';

@Module({
  imports: [
    UserModule,
    DbModule,
    MoneyModule,
    TypeOrmModule.forFeature([DisabledTip]),
    TypeOrmModule.forFeature([CustomTip]),
    PlatformModule,
  ],
  controllers: [TipController, TypoController],
  providers: [
    TypoMerger,
    TypoAdviser,
    BudgetAdviser,
    CustomAdviser,
    ExtraSpendingAdviser,
    RecurrentPaymentAdviser,
    PastDaysBudgetAdviser,
    AdviserUnity,
    TipsFilter,
    TipsDisabler,
    TipsCreator,
    DisabledTipRepository,
    CustomTipRepository,
  ],
})
export class MindModule implements NestModule {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly adviser: AdviserUnity,
  ) {}

  public configure(consumer: MiddlewareConsumer) {
    this.adviser.init(this.moduleRef);
  }
}
