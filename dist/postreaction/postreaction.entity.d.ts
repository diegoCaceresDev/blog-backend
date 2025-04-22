import { User } from '../user/user.entity';
import { Post } from '../posts/posts.entity';
export declare class PostReaction {
    id: number;
    type: 'like' | 'dislike' | null;
    user: User;
    post: Post;
}
