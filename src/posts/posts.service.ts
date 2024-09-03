import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: any): Promise<Post> {
    const userId = user.userId;

    // Verifica que userId esté presente
    if (!userId) {
      throw new Error('User ID is missing from the request');
    }

    // Encuentra el usuario por ID
    const author = await this.userRepository.findOneBy({ id: userId });

    if (!author) {
      throw new Error('User not found');
    }

    const newPost = this.postRepository.create({
      ...createPostDto,
      author: author, // Asociar el usuario con el post
    });

    // Guarda el nuevo post
    return this.postRepository.save(newPost);
  }

  async getAllPosts(): Promise<Post[]> {
    // Cargar la relación del autor
    return this.postRepository.find({ relations: ['author'] });
  }

  // Nuevo método para obtener todos los posts de un usuario por su ID
  async getPostsByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { author: { id: userId } },
      relations: ['author'], // Cargar la relación del autor
    });
  }

  // Método para eliminar un post por su ID
  async deletePostById(postId: number, userId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }

    await this.postRepository.delete(postId);
  }
}
