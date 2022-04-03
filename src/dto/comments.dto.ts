import { IsOptional, IsString } from 'class-validator';

export class CommentsPayload {
  @IsString()
  description!: string;

  @IsString()
  @IsOptional()
  avatar!: string;
}
