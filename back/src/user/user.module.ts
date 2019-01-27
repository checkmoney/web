import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AuthController } from './presentation/http/controller/AuthController'

@Module({
  controllers: [AuthController],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
