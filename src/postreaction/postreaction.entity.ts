import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../posts/posts.entity';

@Entity('postReaction')
export class PostReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: 'like' | 'dislike';

  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions)
  post: Post;
}
