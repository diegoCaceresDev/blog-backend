import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { AuthenticatedRequest } from '../common/request.interface';
import { Post as PostEntity } from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostReactionDto } from './dto/create-postreaction.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, file: Express.Multer.File, req: AuthenticatedRequest): Promise<{
        message: string;
        data: PostEntity;
    }>;
    updatePost(id: number, file: Express.Multer.File, updatePostDto: UpdatePostDto, req: AuthenticatedRequest): Promise<PostEntity>;
    getAllPosts(req: any, page?: number, limit?: number): Promise<{
        posts: any;
        total: number;
    }>;
    getPostsByUserId(userId: number, page?: number, limit?: number): Promise<{
        posts: PostEntity[];
        total: number;
    }>;
    reactToPost(postId: number, createReactionDto: CreatePostReactionDto, req: any): Promise<{
        message: string;
        data: PostEntity;
    }>;
    getPostById(postId: number): Promise<PostEntity>;
    deletePost(postId: number, req: any): Promise<{
        message: string;
    }>;
}
