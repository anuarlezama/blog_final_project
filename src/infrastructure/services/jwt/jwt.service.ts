import { Injectable } from '@nestjs/common';
import {
  IJwtService,
  IJwtServicePayload,
} from '../../../domain/adapters/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}
  async checkToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  createToken(payload: IJwtServicePayload, secret: string): string {
    const accessTokenPayload = {
      iss: 'NestJS Final Project',
      aud: ['final_project'], // Audience (recipient(s))
      nbf: Math.floor((new Date().getTime() - 60 * 60 * 1000) / 1000),
      iat: Math.floor(new Date().getTime() / 1000),
      jti: randomBytes(32).toString('hex'),
      data: { payload },
    };
    return this.jwtService.sign(accessTokenPayload, {
      secret: secret,
    });
  }
}
