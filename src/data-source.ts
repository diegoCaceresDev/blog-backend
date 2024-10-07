import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Post } from './posts/posts.entity';
import { Comment } from './comments/comment.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'diego',
  password: 'diego1302',
  database: 'blog',
  entities: [User, Post, Comment],
  migrations: ['src/migrations/*.ts'], // Ruta de migraciones
  synchronize: false,
});
