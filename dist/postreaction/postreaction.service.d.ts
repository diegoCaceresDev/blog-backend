import { Repository } from 'typeorm';
import { PostReaction } from './postreaction.entity';
import { Post } from 'src/posts/posts.entity';
import { CreatePostReactionDto } from './dto/create-postreaction.dto';
import { User } from 'src/user/user.entity';
export declare class PostReactionService {
    private readonly reactionRepository;
    private readonly postRepository;
    private readonly userRepository;
    constructor(reactionRepository: Repository<PostReaction>, postRepository: Repository<Post>, userRepository: Repository<User>);
    addReactionToPost(postId: number, userId: number, createReactionDto: CreatePostReactionDto): Promise<Post>;
}
