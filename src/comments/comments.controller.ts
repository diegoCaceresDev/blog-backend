// comment.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';
import { AuthenticatedRequest } from '../common/request.interface';
import { UserService } from '../user/user.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService, // Inyecta el servicio de usuario
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ) {
    try {
      const user = req.user; // Obtén el usuario autenticado desde el request
      const comment = await this.commentService.createComment(
        createCommentDto,
        user,
      );
      return { message: 'Comment created successfully', data: comment };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('post/:id')
  @UseGuards(JwtAuthGuard)
  async getCommentsByPostId(@Param('id') postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }
}
