import { Comments } from './comments.dto';

export class News {
  newsId!: number;
  title!: string;
  description!: string;
  createdAt!: Date;
  updatedAt!: Date;
  comments: Comments[];
}
