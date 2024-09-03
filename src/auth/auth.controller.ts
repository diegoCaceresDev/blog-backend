import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validateToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Establece el código de estado HTTP para la creación
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message); // Maneja errores específicos de registro
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // Establece el código de estado  HTTP para el login exitoso
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message); // Maneja errores específicos de login
    }
  }

  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    const isValid = await this.authService.validateToken(
      validateTokenDto.token,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return { valid: true };
  }
}
