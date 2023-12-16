import {
  IsAlpha,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlpha()
  @IsNotEmpty()
  first_name: string;

  @IsAlpha()
  @IsNotEmpty()
  last_name: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsDate()
  last_login: Date;

  @IsString()
  hash_refresh_token: string;
}
