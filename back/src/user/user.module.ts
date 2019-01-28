import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { DbModule } from '@back/db/db.module'

import { AuthController } from './presentation/http/controller/AuthController'
import { ProfileController } from './presentation/http/controller/ProfileController'

import { Registrator } from './application/Registrator'
import { BcryptPasswordEncoder } from './infrastructure/PasswordEncoder/BcryptPasswordEncoder'
import { PasswordEncoder } from './infrastructure/PasswordEncoder/PasswordEncoder'

@Module({
  imports: [DbModule],
  controllers: [AuthController, ProfileController],
  providers: [
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
    Registrator,
  ],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
