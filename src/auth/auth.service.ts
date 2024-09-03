import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.createUser(registerDto);
    return {
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return {
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      // Puedes realizar verificaciones adicionales aquí, si es necesario
      return !!decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
