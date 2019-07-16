import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MoneyModule } from '$back/money/money.module'
import { UserModule } from '$back/user/user.module'
import { DbModule } from '$back/db/db.module'

import { TipController } from './presentation/http/controller/TipController'
import { TypoAdviser } from './application/adviser/TypoAdviser'
import { AdviserUnity } from './infrastructure/adviser/AdviserUnity'
import { TipsFilter } from './application/TipsFilter'
import { DisabledTip } from './domain/DisabledTip.entity'
import { DisabledTipRepository } from './domain/DisabledTipRepository'
import { TipsDisabler } from './application/TipsDisabler'
import { TypoController } from './presentation/http/controller/TypoController'
import { TypoMerger } from './application/TypoMerger'
import { BudgetAdviser } from './application/adviser/BudgetAdviser'
import { ExtraSpendingAdviser } from './application/adviser/ExtraSpendingAdviser'
import { TipsCreator } from './application/TipsCreator'
import { CustomAdviser } from './application/adviser/CustomAdviser'
import { CustomTip } from './domain/CustomTip.entity'
import { CustomTipRepository } from './domain/CustomTipRepository'
import { RecurrentPaymentAdviser } from './application/adviser/RecurrentPaymentAdviser'
import { PastDaysBudgetAdviser } from './application/adviser/PastDaysBudgetAdviser'

@Module({
  imports: [
    UserModule,
    DbModule,
    MoneyModule,
    TypeOrmModule.forFeature([DisabledTip]),
    TypeOrmModule.forFeature([CustomTip]),
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
    this.adviser.init(this.moduleRef)
  }
}
