import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';
import * as process from 'process';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  debug(context: string, message: string): void {
    if (process.env.NODE_ENV != 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  error(context: string, message: string, stack: string): void {
    super.error(`[ERROR] ${message}`, context, stack);
  }

  log(context: string, message: string): void {
    super.log(`[INFO] ${message}`, context);
  }

  verbose(context: string, message: string): void {
    if (process.env.NODE_V != 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }

  warn(context: string, message: string): void {
    super.warn(`[WARN] ${message}`, context);
  }
}
