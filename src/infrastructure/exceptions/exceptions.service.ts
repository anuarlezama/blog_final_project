import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IException,
  IFormatExceptionMessage,
} from '../../domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }

  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }

  internalServerException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }

  unauthorizedException(data: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
}
