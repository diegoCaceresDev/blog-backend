import { User } from '../user/user.entity';
import { Post } from '../posts/posts.entity';
export declare class Comment {
    id: number;
    content: string;
    author: User;
    post: Post;
    createdAt: Date;
    updatedAt: Date;
}
