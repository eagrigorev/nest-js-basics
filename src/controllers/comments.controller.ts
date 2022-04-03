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
import { Express, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsEntity } from '../database/news/news.entity';
import { CommentsEntity } from '../database/comments/comments.entity';
import { CommentsPayload } from '../dto/comments.dto';
import { CommentsService } from '../modules/comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('all')
  async getCommentsAll(
    @Query() query: { newsId: number },
  ): Promise<CommentsEntity[]> {
    return await this.commentsService.getCommentsAll(query.newsId);
  }

  @Get('single')
  async getCommentsSingle(
    @Query()
    query: {
      newsId: number;
      commentsId: number;
    },
  ): Promise<CommentsEntity> {
    return await this.commentsService.getCommentsSingle(
      query.newsId,
      query.commentsId,
    );
  }

  @Post('add')
  async createCommentsSingle(
    @Query() query: { newsId: number },
    @Body() comment: CommentsPayload,
  ): Promise<NewsEntity> {
    return await this.commentsService.createCommentsSingle(
      query.newsId,
      comment,
    );
  }

  @Put('update')
  async updateCommentsSingle(
    @Query()
    query: { newsId: number; commentsId: number },
    @Body() comment: CommentsPayload,
  ): Promise<string> {
    return await this.commentsService.updateCommentsSingle(
      query.newsId,
      query.commentsId,
      comment,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCommentsAvatar(
    @Query()
    query: { newsId: number; commentsId: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.commentsService.uploadCommentsAvatar(
      query.newsId,
      query.commentsId,
      file.path,
    );
  }

  @Get('file')
  getFile(@Res() res: Response) {
    const file = createReadStream(
      join(process.cwd(), './upload/5f7a70515cf218629aeba701fd8213f1'),
    );
    file.pipe(res);
  }
}
