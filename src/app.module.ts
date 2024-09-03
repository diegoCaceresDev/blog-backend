import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Post } from './posts/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'diego1302',
      database: 'postgres',
      entities: [User, Post],
      synchronize: true,
    }),
    PostsModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
