import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { UseCaseProxyModule } from './infrastructure/usecases-proxy/usecase-proxy.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtRefreshStrategy } from './infrastructure/strategies/jwtRefresh.strategy';

@Module({
  imports: [
    ControllersModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        uri: configService.getDatabaseUrl(),
        dbName: configService.getDatabaseName(),
        user: configService.getDatabaseUser(),
        pass: configService.getDatabasePassword(),
      }),
      inject: [EnvironmentConfigService],
    }),
    ExceptionsModule,
    LoggerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    UseCaseProxyModule.register(),
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
  ],
  controllers: [],
  providers: [LoggerService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AppModule {}
