import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostReaction } from './postreaction.entity';
import { Post } from 'src/posts/posts.entity';
import { CreatePostReactionDto } from './dto/create-postreaction.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostReactionService {
  constructor(
    @InjectRepository(PostReaction)
    private readonly reactionRepository: Repository<PostReaction>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

  // Métodos para interactuar con la base de datos
}
