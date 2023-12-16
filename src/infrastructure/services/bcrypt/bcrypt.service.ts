import { IBcryptService } from '../../../domain/adapters/bcrypt.interface';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptService implements IBcryptService {
  rounds: number = 10;

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  async hash(hashString: string): Promise<string> {
    return bcrypt.hash(hashString, this.rounds);
  }
}
