import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateSuperUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  role: string;
}
