import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { Post } from '../posts/posts.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentGateway } from './comments.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'), // Usa ConfigService para obtener el JWT_KEY
        signOptions: { expiresIn: '5m' },
      }),
    }),
    UserModule,
  ],
  providers: [CommentService, CommentGateway], // Añade el gateway aquí
  controllers: [CommentController],
})
export class CommentsModule {}
