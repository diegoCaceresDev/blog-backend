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
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File, // El archivo subido
    @Req() req: any, // El usuario autenticado
  ) {
    // Obtener la URL de la imagen o dejarla como null si no se subió imagen
    const imageUrl = file ? file.filename : null;

    // Llamada al servicio con los tres parámetros
    return this.postService.createPost(createPostDto, req.user, imageUrl);
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
      console.log('File:', file); // Verifica si el archivo está presente
      const imageUrl = file ? file.filename : null;
      updatePostDto.imageUrl = imageUrl;
    }

    // Llamar al servicio para actualizar el post
    return this.postService.updatePost(id, updatePostDto, userId);
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

  // Ruta para obtener un post por su ID
  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protección añadida
  async getPostById(@Param('id') postId: number): Promise<PostEntity> {
    return this.postService.getPostById(postId);
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
