import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './posts.entity';

@Entity()
export class PostReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['like', 'dislike'] })
  type: 'like' | 'dislike';

  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions)
  post: Post;
}
