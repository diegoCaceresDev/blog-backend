import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module'; // Importa el módulo de autenticación con forwardRef si es necesario
import { PostReaction } from 'src/posts/postreaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PostReaction]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
