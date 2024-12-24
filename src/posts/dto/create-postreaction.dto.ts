import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePostReactionDto {
  @IsNotEmpty()
  @IsEnum(['like', 'dislike'])
  type: 'like' | 'dislike';
}
