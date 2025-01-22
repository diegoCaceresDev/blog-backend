import { Controller, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreatePostReactionDto } from '../postreaction/dto/create-postreaction.dto';
import { PostReactionService } from './postreaction.service';

@Controller('postreaction')
export class PostReactionController {
  constructor(private readonly postReactionService: PostReactionService) {}

  @Post(':id/reactions')
  @UseGuards(JwtAuthGuard)
  async reactToPost(
    @Param('id') postId: number,
    @Body() createReactionDto: CreatePostReactionDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const updatedPost = await this.postReactionService.addReactionToPost(
      postId,
      userId,
      createReactionDto,
    );
    return { message: 'Reaction added successfully', data: updatedPost };
  }
}
