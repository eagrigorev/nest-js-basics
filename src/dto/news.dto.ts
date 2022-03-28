import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Comments } from './comments.dto';

export class NewsPayload {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @IsOptional()
  comments: Comments[];
}

export class News extends NewsPayload {
  @IsInt()
  @IsPositive()
  newsId!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
