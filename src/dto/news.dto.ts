import { IsString } from 'class-validator';

export class NewsPayload {
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}
