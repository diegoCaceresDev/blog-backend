import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostReaction } from '../postreaction/postreaction.entity';
export declare class PostService {
    private readonly postRepository;
    private readonly userRepository;
    private readonly reactionRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>, reactionRepository: Repository<PostReaction>);
    createPost(createPostDto: CreatePostDto, user: any, imageUrl: string | null): Promise<Post>;
    getAllPosts(userId: number, page?: number, limit?: number): Promise<Post[]>;
    getPostsByUserId(userId: number, page?: number, limit?: number): Promise<Post[]>;
    updatePost(postId: number, updatePostDto: UpdatePostDto, userId: number): Promise<Post>;
    getPostById(postId: number): Promise<Post>;
    deletePostById(postId: number, userId: number, userRole: string): Promise<void>;
    countDailyPosts(userId: number): Promise<number>;
    countAllPosts(): Promise<number>;
    countPostsByUserId(userId: number): Promise<number>;
}
