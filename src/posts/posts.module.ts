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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostReaction } from './postreaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, PostReaction]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'), // Usa ConfigService para obtener el JWT_KEY
        signOptions: { expiresIn: '15m' },
      }),
    }),
    UserModule,
  ],
  providers: [PostService, JwtAuthGuard, JwtStrategy],
  controllers: [PostController],
})
export class PostsModule {}
