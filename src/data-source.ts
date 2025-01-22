import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Comment } from './comments/comment.entity';
import { Post } from './posts/posts.entity';
import { PostReaction } from './postreaction/postreaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'diego1302',
  database: 'postgres',
  entities: [PostReaction, User, Comment, Post],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
