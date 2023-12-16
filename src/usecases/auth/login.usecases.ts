import { ILogger } from '../../domain/logger/logger.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from '../../domain/adapters/jwt.interface';
import { JwtConfig } from '../../domain/config/jwt.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JwtConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}
  async getCookieWithJwtToken(username: string): Promise<string> {
    this.logger.log(
      'LoginUseCases getCookieWithJwtToken',
      `The user ${username} has been logged in.`,
    );
    const payload: IJwtServicePayload = { username, password: null };
    const secret = this.jwtConfig.getJwtSecret();
    const token = this.jwtTokenService.createToken(payload, secret);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getCookieWithJwtRefreshToken(username: string) {
    this.logger.log(
      'LoginUseCases getTokenWithJwtRefreshToken',
      `The user ${username} has been logged in.`,
    );
    const password = randomStringGenerator();
    const payload: IJwtServicePayload = { username, password };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const token = this.jwtTokenService.createToken(payload, secret);
    const dbUser = await this.userRepository.findByUsername(username);
    const hashPassword = await this.bcryptService.hash(password);
    await this.userRepository.updateLastLogin(dbUser.id);
    await this.userRepository.updateRefreshToken(dbUser.id, hashPassword);
    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  }

  async validateUserForLocalStrategy(username: string, password: string) {
    this.logger.log(
      'LoginUseCases validateUserForLocalStrategy',
      `The user ${username} is being validated.`,
    );
    const user = (
      await this.userRepository.findByUsername(username)
    ).toObject();
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(password, user.password);
    if (user && match) {
      await this.userRepository.updateLastLogin(user.id);
      const { password, hash_refresh_token, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUseForJwtStrategy(username: string) {
    this.logger.log(
      'LoginUseCases validateUseForJwtStrategy',
      `The user ${username} is being validated.`,
    );
    const user = (
      await this.userRepository.findByUsername(username)
    ).toObject();
    if (!user) {
      return null;
    }
    const { password, hash_refresh_token, ...result } = user;
    return result;
  }

  async getUserIfRefreshTokenMatches(
    refreshPassword: string,
    username: string,
  ) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshPassword,
      user.toObject().hash_refresh_token,
    );
    if (isRefreshTokenMatching) {
      const { password, hash_refresh_token, ...result } = user;
      return result;
    }

    return null;
  }
}
