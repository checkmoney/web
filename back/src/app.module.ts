import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { MoneyModule } from './money/money.module'
import { UserModule } from './user/user.module'
import { UtilsModule } from './utils/utils.module'

@Module({
  imports: [UserModule, MoneyModule, UtilsModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
