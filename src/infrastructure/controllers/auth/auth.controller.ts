import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UseCaseProxyModule } from '../../usecases-proxy/usecase-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecase-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { LoginGuard } from '../../guards/login.guard';
import { AuthLoginDto } from './auth-dto.class';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { IsAuthPresenter } from './auth.presenter';
import JwtRefreshGuard from '../../guards/jwtRefresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UseCaseProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UseCaseProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUseCaseProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UseCaseProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly authenticatedUseCase: UseCaseProxy<IsAuthenticatedUseCases>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return 'Login successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() request: any) {
    const cookie = await this.logoutUseCaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('is_authenticated')
  @UseGuards(JwtAuthGuard)
  async isAuthenticated(@Request() request: any) {
    const user = await this.authenticatedUseCase
      .getInstance()
      .execute(request.user.username);
    const response = new IsAuthPresenter();
    if (!user) {
      return null;
    }
    response.username = user.username;
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successfully';
  }
}
