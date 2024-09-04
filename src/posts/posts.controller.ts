import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { AuthenticatedRequest } from '../common/request.interface';
import { Post as PostEntity } from './posts.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PostEntity> {
    const user = req.user;
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Protección añadida
  async getAllPosts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ posts: PostEntity[]; total: number }> {
    const posts = await this.postService.getAllPosts(page, limit);
    const total = await this.postService.countAllPosts(); // Método que cuenta el total de posts
    return { posts, total };
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard) // Protección añadida
  async getPostsByUserId(
    @Param('id') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ posts: PostEntity[]; total: number }> {
    const posts = await this.postService.getPostsByUserId(userId, page, limit);
    const total = await this.postService.countPostsByUserId(userId); // Método que cuenta el total de posts por usuario
    return { posts, total };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    await this.postService.deletePostById(id, userId);
  }
}
