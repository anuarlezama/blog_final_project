import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: string;
}
