import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
