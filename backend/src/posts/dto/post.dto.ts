import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreatePostDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
