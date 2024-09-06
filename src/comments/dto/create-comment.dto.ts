// create-comment.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number; // Asegúrate de que este campo esté presente
}
