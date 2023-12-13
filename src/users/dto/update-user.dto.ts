import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsNotEmpty()
  readonly email?: string;

  @IsAlpha()
  @IsNotEmpty()
  readonly first_name?: string;

  @IsAlpha()
  @IsNotEmpty()
  readonly last_name?: string;
}
