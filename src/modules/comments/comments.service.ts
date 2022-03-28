import { Injectable } from '@nestjs/common';
import { Comments, CommentsPayload } from '../../dto/comments.dto';
import { News } from '../../dto/news.dto';
import { NewsService } from '../news/news.service';

let commentsIdGlobal = 4;

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

  async createComments(newsId: number, data: CommentsPayload): Promise<News[]> {
    const news = await this.newsService.getNewsAll();
    const newCommentsEntry: Comments = {
      ...data,
      commentsId: commentsIdGlobal,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };
    commentsIdGlobal++;
    news[newsId].comments.push(newCommentsEntry);
    return news;
  }

  async updateComments(
    newsId: number,
    commentsId: number,
    data: CommentsPayload,
  ): Promise<News[]> {
    const news = await this.newsService.getNewsAll();
    let existingComments = news[newsId].comments[commentsId];
    existingComments = {
      ...existingComments,
      ...data,
      updatedAt: new Date(Date.now()),
    };
    news[newsId].comments[commentsId] = existingComments;
    return news;
  }

  async uploadAvatar(
    newsId: number,
    commentsId: number,
    path: string,
  ): Promise<void> {
    const news = await this.newsService.getNewsAll();
    news[newsId].comments[commentsId].avatar = path;
  }
}
