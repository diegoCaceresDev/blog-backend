import { User } from '../user/user.entity';
import { Comment } from '../comments/comment.entity';
import { PostReaction } from './postreaction.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    likeCount: number;
    dislikeCount: number;
    reactions: PostReaction[];
    author: User;
    comments: Comment[];
}
