import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { Post } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostReaction } from './postreaction.entity';
import { CreatePostReactionDto } from './dto/create-postreaction.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PostReaction)
    private readonly reactionRepository: Repository<PostReaction>,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    user: any,
    imageUrl: string | null,
  ): Promise<Post> {
    const userId = user.userId;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const author = await this.userRepository.findOneBy({ id: userId });
    if (!author) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const dailyPosts = await this.countDailyPosts(userId);
    const MAX_POSTS_PER_DAY = 5;
    if (dailyPosts >= MAX_POSTS_PER_DAY) {
      throw new BadRequestException(
        `You have reached the daily limit of ${MAX_POSTS_PER_DAY} posts`,
      );
    }

    const newPost = this.postRepository.create({
      ...createPostDto,
      author,
      imageUrl,
    });

    return this.postRepository.save(newPost);
  }

  async getAllPosts(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<Post[]> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect(
        'post.reactions',
        'reaction',
        'reaction.userId = :userId',
        { userId },
      )
      .orderBy('post.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    // Agrega la reacción del usuario actual al objeto Post
    return posts.map((post) => {
      const userReaction = post.reactions?.[0]?.type || null;
      return { ...post, userReaction };
    });
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

  // Metodo que actualiza el post
  async updatePost(
    postId: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }

    // Actualizar los campos del post
    Object.assign(post, updatePostDto);

    return this.postRepository.save(post);
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
  async deletePostById(
    postId: number,
    userId: number,
    userRole: string,
  ): Promise<void> {
    // Buscar el post
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post no encontrado');
    }
    // Permitir eliminar si el usuario es el autor del post o un superusuario
    if (post.author.id !== userId && userRole !== 'superuser') {
      throw new UnauthorizedException(
        'No tienes permiso para eliminar este post',
      );
    }

    // Si pasa las verificaciones, proceder con la eliminación
    await this.postRepository.delete(postId);
  }

  // Método para agregar o actualizar reacciones
  async addReactionToPost(
    postId: number,
    userId: number,
    createReactionDto: CreatePostReactionDto,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Buscar reacción existente
    let reaction = await this.reactionRepository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });

    if (reaction) {
      // Si la reacción es diferente, actualizamos los contadores
      if (reaction.type !== createReactionDto.type) {
        // Decrementar el contador de la reacción anterior
        if (reaction.type === 'like') {
          post.likeCount -= 1;
        } else if (reaction.type === 'dislike') {
          post.dislikeCount -= 1;
        }

        // Actualizar el tipo de reacción
        reaction.type = createReactionDto.type;

        // Incrementar el contador de la nueva reacción
        if (createReactionDto.type === 'like') {
          post.likeCount += 1;
        } else if (createReactionDto.type === 'dislike') {
          post.dislikeCount += 1;
        }
      } else {
        throw new BadRequestException(
          'You have already reacted with this type',
        );
      }
    } else {
      // Crear una nueva reacción
      reaction = this.reactionRepository.create({
        type: createReactionDto.type,
        user,
        post,
      });

      // Incrementar el contador correspondiente
      if (createReactionDto.type === 'like') {
        post.likeCount += 1;
      } else if (createReactionDto.type === 'dislike') {
        post.dislikeCount += 1;
      }
    }

    await this.reactionRepository.save(reaction);

    // Guardar los cambios en el post
    await this.postRepository.save(post);

    return post;
  }

  async countDailyPosts(userId: number): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Inicio del día
    return this.postRepository.count({
      where: {
        author: { id: userId },
        createdAt: MoreThan(today),
      },
    });
  }

  async countAllPosts(): Promise<number> {
    return this.postRepository.count();
  }

  async countPostsByUserId(userId: number): Promise<number> {
    return this.postRepository.count({ where: { author: { id: userId } } });
  }
}
