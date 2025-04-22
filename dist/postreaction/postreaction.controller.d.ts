import { CreatePostReactionDto } from '../postreaction/dto/create-postreaction.dto';
import { PostReactionService } from './postreaction.service';
export declare class PostReactionController {
    private readonly postReactionService;
    constructor(postReactionService: PostReactionService);
    reactToPost(postId: number, createReactionDto: CreatePostReactionDto, req: any): Promise<{
        message: string;
        data: import("../posts/posts.entity").Post;
    }>;
}
