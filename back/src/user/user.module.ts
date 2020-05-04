import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '&back/config/config.module';
import { DbModule } from '&back/db/db.module';
import { PlatformModule } from '&back/platform/platform.module';
import { UtilsModule } from '&back/utils/utils.module';

import { Authenticator } from './application/Authenticator';
import { ProfileEditor } from './application/ProfileEditor';
import { Registrator } from './application/Registrator';
import { SignInProvider } from './application/SignInProvider';
import { GoogleValidator } from './application/social/GoogleValidator';
import { SocialBinder } from './application/SocialBinder';
import { User } from './domain/User.entity';
import { UserRepository } from './domain/UserRepository';
import { JwtOptionsFactory } from './infrastructure/JwtOptionsFactory';
import { BcryptPasswordEncoder } from './infrastructure/PasswordEncoder/BcryptPasswordEncoder';
import { PasswordEncoder } from './infrastructure/PasswordEncoder/PasswordEncoder';
import { AuthController } from './presentation/http/controller/AuthController';
import { DetBellController } from './presentation/http/controller/DetBellController';
import { ProfileController } from './presentation/http/controller/ProfileController';
import { SocialController } from './presentation/http/controller/SocialController';
import { InvalidCredentialsFilter } from './presentation/http/filter/InvalidCredentialsFilter';
import { LoginAlreadyTakenFilter } from './presentation/http/filter/LoginAlreadyTakenFilter';
import { JwtGuard } from './presentation/http/security/JwtGuard';
import { JwtManagerGuard } from './presentation/http/security/JwtManagerGuard';
import { AuthActions } from './presentation/telegram/actions/AuthActions';
import { InvalidCredentialsCatcher } from './presentation/telegram/catcher/InvalidCredentialsCatcher';
import { CurrentSender } from './presentation/telegram/transformer/CurrentSender';
import { IsKnownUser } from './presentation/telegram/transformer/IsKnownUser';

@Module({
  imports: [
    DbModule,
    UtilsModule,
    PlatformModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtOptionsFactory,
    }),
  ],
  controllers: [
    AuthController,
    ProfileController,
    SocialController,
    DetBellController,
  ],
  providers: [
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
    SocialBinder,
    GoogleValidator,
    LoginAlreadyTakenFilter.provider(),
    InvalidCredentialsFilter.provider(),
    SignInProvider,
    Authenticator,
    Registrator,
    ProfileEditor,
    UserRepository,
    JwtGuard,
    JwtManagerGuard,
    AuthActions,
    InvalidCredentialsCatcher,
    IsKnownUser,
    CurrentSender,
  ],
  exports: [
    UserRepository,
    JwtGuard,
    JwtManagerGuard,
    Authenticator,
    CurrentSender,
  ],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
