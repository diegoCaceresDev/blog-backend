import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostReaction } from './postreaction/postreaction.entity';
import { Post } from './posts/posts.entity';
import { PostReactionModule } from './postreaction/postreaction.module';
import { DailyPhraseModule } from './daily-phrase/daily-phrase.module';
import { DailyPhrase } from './daily-phrase/entities/daily-phrase.entity';
import { MementoModule } from './memento/memento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno sean accesibles en toda la aplicación
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Post, Comment, PostReaction, DailyPhrase],
        migrations: ['dist/migrations/*.js'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    PostsModule,
    UserModule,
    AuthModule,
    ChatgptModule,
    CommentsModule,
    PostReactionModule,
    DailyPhraseModule,
    MementoModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
