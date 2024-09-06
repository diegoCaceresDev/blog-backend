import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../user/user.entity';
import { Post } from '../posts/posts.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post,
      author: user,
    });

    return this.commentRepository.save(newComment);
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author', 'post'],
    });
  }
}
