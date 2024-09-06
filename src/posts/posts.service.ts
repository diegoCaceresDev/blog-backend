import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
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

  async getAllPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const options: FindManyOptions<Post> = {
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
    };

    return this.postRepository.find(options);
  }

  // Ajuste para el método de obtener posts por ID de usuario
  async getPostsByUserId(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<Post[]> {
    const options: FindManyOptions<Post> = {
      where: { author: { id: userId } },
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
    };

    return this.postRepository.find(options);
  }

  // Método para obtener un post por su ID
  async getPostById(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'], // Incluye la relación con el autor
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
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

  async countAllPosts(): Promise<number> {
    return this.postRepository.count();
  }

  async countPostsByUserId(userId: number): Promise<number> {
    return this.postRepository.count({ where: { author: { id: userId } } });
  }
}
