import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AuthController } from './presentation/http/controller/AuthController'
import { ProfileController } from './presentation/http/controller/ProfileController'

@Module({
  controllers: [AuthController, ProfileController],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
