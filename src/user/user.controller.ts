import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthenticatedRequest } from 'src/common/request.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return { success: true, user };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard) // Protege este endpoint con el guardia JWT
  async getMe(@Req() req: AuthenticatedRequest) {
    console.log('Authenticated user:', req.user); // Verifica la estructura de req.user
    return this.userService.findUserById(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protege este endpoint con el guardia JWT
  async getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.findUserById(id);
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard) // Protege este endpoint con el guardia JWT
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<User | undefined> {
    return this.userService.findUserByEmail(email);
  }
}
