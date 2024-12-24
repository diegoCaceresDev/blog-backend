import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'The title must be at least 10 characters' })
  @MaxLength(100, { message: 'The title cannot exceed 100 characters' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'The content must be at least 10 characters' })
  @MaxLength(500, { message: 'The content cannot exceed 500 characters' })
  content: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
