import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '@back/config/config.module'
import { DbModule } from '@back/db/db.module'

import { AuthController } from './presentation/http/controller/AuthController'
import { ProfileController } from './presentation/http/controller/ProfileController'
import { InvalidCredentialsFilter } from './presentation/http/filter/InvalidCredentialsFilter'
import { LoginAlreadyTakenFilter } from './presentation/http/filter/LoginAlreadyTakenFilter'
import { JwtGuard } from './presentation/http/security/JwtGuard'
import { AuthActions } from './presentation/telegram/actions/AuthActions'
import { InvalidCredentialsCatcher } from './presentation/telegram/catcher/InvalidCredentialsCatcher'
import { IsKnownUser } from './presentation/telegram/transformer/IsKnownUser'
import { CurrentSender } from './presentation/telegram/transformer/CurrentSender'

import { User } from './domain/User.entity'
import { UserRepository } from './domain/UserRepository'

import { Authenticator } from './application/Authenticator'
import { ProfileEditor } from './application/ProfileEditor'
import { Registrator } from './application/Registrator'

import { JwtOptionsFactory } from './infrastructure/JwtOptionsFactory'
import { BcryptPasswordEncoder } from './infrastructure/PasswordEncoder/BcryptPasswordEncoder'
import { PasswordEncoder } from './infrastructure/PasswordEncoder/PasswordEncoder'

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtOptionsFactory,
    }),
  ],
  controllers: [AuthController, ProfileController],
  providers: [
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
    LoginAlreadyTakenFilter.provider(),
    InvalidCredentialsFilter.provider(),
    Authenticator,
    Registrator,
    ProfileEditor,
    UserRepository,
    JwtGuard,
    AuthActions,
    InvalidCredentialsCatcher,
    IsKnownUser,
    CurrentSender,
  ],
  exports: [UserRepository, JwtGuard, Authenticator, CurrentSender],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
