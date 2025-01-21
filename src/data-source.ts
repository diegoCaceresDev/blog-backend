import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Comment } from './comments/comment.entity';
import { Post } from './posts/posts.entity';
import { PostReaction } from './posts/postreaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'diego1302',
  database: 'postgres',
  entities: [User, Comment, PostReaction, Post],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
