import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { News } from 'src/dto/news.dto';
import { Comments } from '../dto/comments.dto';
import { CommentsService } from '../modules/comments/comments.service';
import { IdDecrement } from '../utils/decorators/idDecrement';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('single')
  async getCommentsSingle(
    @Query()
    @IdDecrement(['newsId', 'commentsId'])
    query: {
      newsId: number;
      commentsId: number;
    },
  ): Promise<Comments> {
    return this.commentsService.getCommentsSingle(
      query.newsId,
      query.commentsId,
    );
  }

  @Get('all')
  async getCommentsAll(
    @Query() @IdDecrement(['newsId']) query: { newsId: number },
  ): Promise<Comments[]> {
    return this.commentsService.getCommentsAll(query.newsId);
  }

  @Post('add')
  async createComments(
    @Query() @IdDecrement(['newsId']) query: { newsId: number },
    @Body() @IdDecrement(['commentsId']) body: Comments,
  ): Promise<News[]> {
    return this.commentsService.createComments(query.newsId, body);
  }

  @Put('update')
  async updateComments(
    @Query()
    @IdDecrement(['newsId', 'commentsId'])
    query: { newsId: number; commentsId: number },
    @Body() @IdDecrement(['commentsId']) body: Comments,
  ): Promise<News[]> {
    return this.commentsService.updateComments(
      query.newsId,
      query.commentsId,
      body,
    );
  }
}
