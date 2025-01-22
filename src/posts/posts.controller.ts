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
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { AuthenticatedRequest } from '../common/request.interface';
import { Post as PostEntity } from './posts.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Multer } from 'multer';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostReactionDto } from '../postreaction/dto/create-postreaction.dto';
import { JwtAuthGuardWithRole } from 'src/auth/jwt-authwithrotle.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images', // Carpeta donde se guardarán las imágenes
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new Error('Solo se permiten archivos de imagen'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      const imageUrl = file ? file.filename : null;
      const post = await this.postService.createPost(
        createPostDto,
        req.user,
        imageUrl,
      );
      return { message: 'Post created successfully', data: post };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images', // Carpeta donde se guardarán las imágenes
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new Error('Solo se permiten archivos de imagen'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async updatePost(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File, // Capturar el archivo subido
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PostEntity> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Si se subió una imagen, actualizar el campo imageUrl en el DTO
    if (file) {
      const imageUrl = file ? file.filename : null;
      updatePostDto.imageUrl = imageUrl;
    }

    // Llamar al servicio para actualizar el post
    return this.postService.updatePost(id, updatePostDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ posts; total: number }> {
    const userId = req.user.userId;
    const posts = await this.postService.getAllPosts(userId, page, limit);
    const total = await this.postService.countAllPosts();
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

  // Ruta para obtener un post por su ID
  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protección añadida
  async getPostById(@Param('id') postId: number): Promise<PostEntity> {
    return this.postService.getPostById(postId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuardWithRole) // Usar el guardia extendido que agrega el rol al request
  async deletePost(
    @Param('id') postId: number,
    @Req() req: any, // El request ahora tiene userId y userRole
  ) {
    const userId = req.user.id; // ID del usuario autenticado
    const userRole = req.user.role; // Rol del usuario autenticado
    console.log(req.user);
    await this.postService.deletePostById(postId, userId, userRole);
    return { message: 'Post eliminado correctamente' };
  }
}
