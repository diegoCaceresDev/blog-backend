import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nombre: string;

  @IsString()
  username: string;

  @IsString()
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
