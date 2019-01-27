import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
