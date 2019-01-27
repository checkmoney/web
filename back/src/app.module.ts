import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { MoneyModule } from './money/money.module'
import { UserModule } from './user/user.module'
import { ParseDatePipe } from './utils/http/ParseDatePipe'

@Module({
  imports: [UserModule, MoneyModule],
  providers: [ParseDatePipe],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
