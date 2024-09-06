// comment.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
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

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    const user = await this.userService.findUserById(userId); // Busca el usuario completo
    return this.commentService.createComment(createCommentDto, user);
  }

  @Get('post/:id')
  @UseGuards(JwtAuthGuard)
  async getCommentsByPostId(@Param('id') postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }
}
