import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostReaction } from './postreaction.entity';
import { User } from 'src/user/user.entity';
import { PostReactionService } from './postreaction.service';
import { PostReactionController } from './postreaction.controller';
import { PostsModule } from 'src/posts/posts.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { Post } from 'src/posts/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostReaction, User, Post]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importa ConfigModule
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'), // Usa ConfigService para obtener el JWT_KEY
        signOptions: { expiresIn: '15m' },
      }),
    }),
    UserModule,
    PostsModule,
  ],
  providers: [PostReactionService],
  controllers: [PostReactionController],
})
export class PostReactionModule {}
