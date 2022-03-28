import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { News } from '../dto/news.dto';
import { Comments, CommentsPayload } from '../dto/comments.dto';
import { CommentsService } from '../modules/comments/comments.service';
import { IdDecrement } from '../utils/decorators/idDecrement';
import { Express, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

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
    @Body() @IdDecrement(['commentsId']) body: CommentsPayload,
  ): Promise<News[]> {
    return this.commentsService.createComments(query.newsId, body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Query()
    @IdDecrement(['newsId', 'commentsId'])
    query: { newsId: number; commentsId: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.commentsService.uploadAvatar(
      query.newsId,
      query.commentsId,
      file.path,
    );
    console.log(file);
  }

  @Get('file')
  getFile(@Res() res: Response) {
    const file = createReadStream(
      join(process.cwd(), './upload/5f7a70515cf218629aeba701fd8213f1'),
    );
    file.pipe(res);
  }

  @Put('update')
  async updateComments(
    @Query()
    @IdDecrement(['newsId', 'commentsId'])
    query: { newsId: number; commentsId: number },
    @Body() @IdDecrement(['commentsId']) body: CommentsPayload,
  ): Promise<News[]> {
    return this.commentsService.updateComments(
      query.newsId,
      query.commentsId,
      body,
    );
  }
}
