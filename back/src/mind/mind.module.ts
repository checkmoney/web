import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'

import { MoneyModule } from '@back/money/money.module'
import { UserModule } from '@back/user/user.module'

import { TypoFinder } from './application/TypoFinder'
import { TipController } from './presentation/http/controller/TipController'
import { TypoAdviser } from './application/adviser/TypoAdviser'
import { AdviserUnity } from './infrastructure/adviser/AdviserUnity'

@Module({
  imports: [UserModule, MoneyModule],
  controllers: [TipController],
  providers: [TypoFinder, TypoAdviser, AdviserUnity],
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
