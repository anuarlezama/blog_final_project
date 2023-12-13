import { AllExceptionFilter } from './exception.filter';
import { LoggerService } from '../../logger/logger.service';

describe('FilterMiddleware', () => {
  it('should be defined', () => {
    expect(new AllExceptionFilter(new LoggerService())).toBeDefined();
  });
});
