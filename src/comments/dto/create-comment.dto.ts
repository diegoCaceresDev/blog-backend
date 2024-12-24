// create-comment.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(1, { message: 'The comment must be at least 1 characters' })
  @MaxLength(300, { message: 'The comment cannot exceed 300 characters' })
  content: string;
  @IsNotEmpty()
  @IsNumber()
  postId: number; // Asegúrate de que este campo esté presente
}
