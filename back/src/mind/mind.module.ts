import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MoneyModule } from '@back/money/money.module'
import { UserModule } from '@back/user/user.module'
import { DbModule } from '@back/db/db.module'

import { TypoFinder } from './application/TypoFinder'
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

@Module({
  imports: [
    UserModule,
    DbModule,
    MoneyModule,
    TypeOrmModule.forFeature([DisabledTip]),
  ],
  controllers: [TipController, TypoController],
  providers: [
    TypoFinder,
    TypoMerger,
    TypoAdviser,
    BudgetAdviser,
    ExtraSpendingAdviser,
    AdviserUnity,
    TipsFilter,
    TipsDisabler,
    DisabledTipRepository,
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
