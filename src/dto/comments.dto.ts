import {
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CommentsPayload {
  @IsString()
  description!: string;

  @IsString()
  @IsOptional()
  avatar!: string;
}

export class Comments extends CommentsPayload {
  @IsInt()
  @IsPositive()
  commentsId!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
