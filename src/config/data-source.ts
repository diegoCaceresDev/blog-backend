import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../posts/posts.entity';
import { Comment } from 'src/comments/comment.entity';
import { PostReaction } from 'src/postreaction/postreaction.entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'diego1302',
  database: 'postgres',
  entities: [User, Post, Comment, PostReaction], // Entidades
  migrations: ['src/migrations/*.ts'], // Ruta de migraciones
  synchronize: true,
});
