import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { UseCaseProxyModule } from '../usecases-proxy/usecase-proxy.module';
import { UseCaseProxy } from '../usecases-proxy/usecase-proxy';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LoggerService } from '../logger/logger.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UseCaseProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(data: any) {
    const user = this.loginUseCaseProxy
      .getInstance()
      .validateUseForJwtStrategy(data.data.payload.username);
    if (!user) {
      this.logger.warn('Jwt Strategy', `User not found`);
      this.exceptionService.unauthorizedException({
        message: 'User not found',
      });
    }
    return user;
  }
}
