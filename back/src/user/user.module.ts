import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DbModule } from '@back/db/db.module'

import { AuthController } from './presentation/http/controller/AuthController'
import { ProfileController } from './presentation/http/controller/ProfileController'

import { User } from './domain/User.entity'
import { UserRepository } from './domain/UserRepository'

import { Registrator } from './application/Registrator'

import { BcryptPasswordEncoder } from './infrastructure/PasswordEncoder/BcryptPasswordEncoder'
import { PasswordEncoder } from './infrastructure/PasswordEncoder/PasswordEncoder'

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController, ProfileController],
  providers: [
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
    Registrator,
    UserRepository,
  ],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
