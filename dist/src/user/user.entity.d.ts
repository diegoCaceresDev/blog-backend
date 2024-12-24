import { Post } from '../posts/posts.entity';
import { Comment } from '../comments/comment.entity';
import { PostReaction } from 'src/posts/postreaction.entity';
export declare class User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password: string;
    reactions: PostReaction[];
    posts: Post[];
    comments: Comment[];
    role: 'user' | 'admin' | 'superuser';
}
