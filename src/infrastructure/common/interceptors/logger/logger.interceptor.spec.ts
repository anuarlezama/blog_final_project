import { LoggerInterceptor } from './logger.interceptor';
import { LoggerService } from "../../../logger/logger.service";

describe('LoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggerInterceptor(new LoggerService())).toBeDefined();
  });
});
