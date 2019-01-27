import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { MoneyModule } from './money/money.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule, MoneyModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
