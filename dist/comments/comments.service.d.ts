import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../user/user.entity';
import { Post } from '../posts/posts.entity';
export declare class CommentService {
    private readonly commentRepository;
    private readonly postRepository;
    constructor(commentRepository: Repository<Comment>, postRepository: Repository<Post>);
    createComment(createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
    getCommentsByPostId(postId: number): Promise<Comment[]>;
}
