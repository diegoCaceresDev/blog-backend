import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';
import { UserService } from '../user/user.service';
export declare class CommentController {
    private readonly commentService;
    private readonly userService;
    constructor(commentService: CommentService, userService: UserService);
    createComment(createCommentDto: CreateCommentDto, req: any): Promise<{
        message: string;
        data: import("./comment.entity").Comment;
    }>;
    getCommentsByPostId(postId: number): Promise<import("./comment.entity").Comment[]>;
}
