import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Importa JwtModule
import { Post } from './posts.entity';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Asegúrate de que la ruta sea correcta
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '5m' },
    }),
    UserModule,
  ],
  providers: [PostService, JwtAuthGuard, JwtStrategy],
  controllers: [PostController],
})
export class PostsModule {}
