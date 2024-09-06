import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Post } from './posts/posts.entity';
import { ConfigModule } from '@nestjs/config';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno sean accesibles en toda la aplicación
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'diego1302',
      database: 'postgres',
      entities: [User, Post, Comment],
      synchronize: true,
    }),
    PostsModule,
    UserModule,
    AuthModule,
    ChatgptModule,
    CommentsModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
