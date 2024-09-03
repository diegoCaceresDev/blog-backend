import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { AuthenticatedRequest } from '../common/request.interface'; // Ajusta la ruta si es necesario
import { Post as PostEntity } from './posts.entity'; // Asegúrate de ajustar la ruta

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
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get('user/:id')
  async getPostsByUserId(@Param('id') userId: number): Promise<PostEntity[]> {
    return this.postService.getPostsByUserId(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    const userId = req.user?.userId; // Debe coincidir con el payload de JWT
    if (!userId) {
      throw new Error('User not authenticated');
    }
    await this.postService.deletePostById(id, userId);
  }
}
