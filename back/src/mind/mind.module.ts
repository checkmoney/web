import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MoneyModule } from '@back/money/money.module'
import { UserModule } from '@back/user/user.module'

import { TypoFinder } from './application/TypoFinder'
import { TipController } from './presentation/http/controller/TipController'
import { TypoAdviser } from './application/adviser/TypoAdviser'
import { AdviserUnity } from './infrastructure/adviser/AdviserUnity'
import { TipsFilter } from './application/TipsFilter'
import { DisabledTip } from './domain/DisabledTip.entity'
import { DisabledTipRepository } from './domain/DisabledTipRepository'

@Module({
  imports: [UserModule, MoneyModule, TypeOrmModule.forFeature([DisabledTip])],
  controllers: [TipController],
  providers: [
    TypoFinder,
    TypoAdviser,
    AdviserUnity,
    TipsFilter,
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
