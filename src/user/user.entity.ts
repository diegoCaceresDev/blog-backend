import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/posts.entity';
import { Comment } from '../comments/comment.entity'; // Importa la entidad Comment
import { PostReaction } from 'src/postreaction/postreaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => PostReaction, (reaction) => reaction.user, { cascade: true })
  reactions: PostReaction[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author) // Relación con los comentarios
  comments: Comment[];

  @Column({ default: 'user' })
  role: 'user' | 'admin' | 'superuser';
}
