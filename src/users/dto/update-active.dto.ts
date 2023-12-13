import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateActiveDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
