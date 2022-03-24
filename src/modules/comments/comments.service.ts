import { Injectable } from '@nestjs/common';
import { Comments } from '../../dto/comments.dto';
import { News } from '../../dto/news.dto';
import { NewsService } from '../news/news.service';

@Injectable()
export class CommentsService {
  constructor(private newsService: NewsService) {}

  async getCommentsSingle(
    newsId: number,
    commentsId: number,
  ): Promise<Comments> {
    const news = await this.newsService.getNewsAll();
    if (news[newsId].comments[commentsId]) {
      return news[newsId].comments[commentsId];
    } else throw new Error('Error 404: Entry not found!');
  }

  async getCommentsAll(newsId: number): Promise<Comments[]> {
    const news = await this.newsService.getNewsAll();
    return news[newsId].comments;
  }

  async createComments(newsId: number, data: Comments): Promise<News[]> {
    const news = await this.newsService.getNewsAll();
    news[newsId].comments.push(data);
    return news;
  }

  async updateComments(
    newsId: number,
    commentsId: number,
    data: Comments,
  ): Promise<News[]> {
    const news = await this.newsService.getNewsAll();
    let existingComments = news[newsId].comments[commentsId];
    existingComments = { ...existingComments, ...data };
    news[newsId].comments[commentsId] = existingComments;
    return news;
  }
}
