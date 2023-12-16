import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { Inject, Injectable } from '@nestjs/common';
import { UseCaseProxyModule } from '../usecases-proxy/usecase-proxy.module';
import { UseCaseProxy } from '../usecases-proxy/usecase-proxy';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LoggerService } from '../logger/logger.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { Request } from 'express';
import { TokenPayload } from '../../domain/model/auth';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    @Inject(UseCaseProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
    private readonly configService: EnvironmentConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.getJwtRefreshSecret(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const user = this.loginUseCaseProxy
      .getInstance()
      .getUserIfRefreshTokenMatches(
        payload.data.payload.password,
        payload.data.payload.username,
      );
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found or hash not correct`);
      this.exceptionService.unauthorizedException({
        message: 'User not found or hash not correct',
      });
    }
    return user;
  }
}
