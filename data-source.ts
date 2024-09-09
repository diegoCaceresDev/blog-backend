import { DataSource } from 'typeorm';
import { User } from './src/user/user.entity';
import { Post } from './src/posts/posts.entity';
import { Comment } from './src/comments/comment.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'diego1302',
  database: 'postgres',
  entities: [User, Post, Comment],
  migrations: ['src/migrations/*.ts'], // Ruta de migraciones
  synchronize: false,
});
