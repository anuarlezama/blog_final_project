import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecase-proxy';
import { LoggerService } from '../logger/logger.service';
import { UsersService } from '../repositories/user/users.service';
import { NewUserUseCases } from '../../usecases/user/newUser.usecases';
import { LoggerModule } from '../logger/logger.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UpdateUserUseCases } from '../../usecases/user/updateUser.usecases';
import { UpdateUserPasswordUseCases } from '../../usecases/user/updateUserPassword.usecases';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { JwtModule } from '../services/jwt/jwt.module';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    JwtModule,
    EnvironmentConfigModule,
    BcryptModule,
    PassportModule,
  ],
})
export class UseCaseProxyModule {
  static POST_NEW_USER_PROXY = 'postNewUserProxy';
  static PATCH_UPDATE_USER_PROXY = 'patchUpdateUserProxy';
  static PATCH_UPDATE_USER_PASSWORD_PROXY = 'patchUpdateUserPasswordProxy';

  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [
        {
          inject: [LoggerService, UsersService, BcryptService],
          provide: UseCaseProxyModule.POST_NEW_USER_PROXY,
          useFactory: (
            logger: LoggerService,
            userService: UsersService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new NewUserUseCases(logger, userService, bcryptService),
            ),
        },
        {
          inject: [LoggerService, UsersService],
          provide: UseCaseProxyModule.PATCH_UPDATE_USER_PROXY,
          useFactory: (logger: LoggerService, userService: UsersService) =>
            new UseCaseProxy(new UpdateUserUseCases(logger, userService)),
        },
        {
          inject: [],
          provide: UseCaseProxyModule.PATCH_UPDATE_USER_PASSWORD_PROXY,
          useFactory: (logger: LoggerService, userService: UsersService) =>
            new UseCaseProxy(
              new UpdateUserPasswordUseCases(logger, userService),
            ),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            UsersService,
            BcryptService,
          ],
          provide: UseCaseProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: UsersService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [UsersService],
          provide: UseCaseProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: UsersService) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UseCaseProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
      ],
      exports: [
        UseCaseProxyModule.POST_NEW_USER_PROXY,
        UseCaseProxyModule.PATCH_UPDATE_USER_PROXY,
        UseCaseProxyModule.PATCH_UPDATE_USER_PASSWORD_PROXY,
        UseCaseProxyModule.LOGIN_USECASES_PROXY,
        UseCaseProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UseCaseProxyModule.LOGOUT_USECASES_PROXY,
      ],
    };
  }
}
