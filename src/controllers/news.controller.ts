import {
  Controller,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { News, NewsPayload } from '../dto/news.dto';
import { NewsService } from '../modules/news/news.service';
import { IdDecrement } from '../utils/decorators/idDecrement';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('single')
  async getNewsSingle(
    @Query() @IdDecrement(['newsId']) query: { newsId: number },
  ): Promise<News> {
    return this.newsService.getNewsSingle(query.newsId);
  }

  @Get('single-display')
  async getNewsSingleDisplay(
    @Query() @IdDecrement(['newsId']) query: { newsId: number },
  ): Promise<string> {
    return this.newsService.getNewsSingleDisplay(query.newsId);
  }

  @Get('all')
  async getNewsAll(): Promise<News[]> {
    return this.newsService.getNewsAll();
  }

  @Post('add')
  async createNews(
    @Body() @IdDecrement(['newsId']) body: NewsPayload,
  ): Promise<News[]> {
    return this.newsService.createNews(body);
  }

  @Put('update')
  async updateNews(
    @Query() @IdDecrement(['newsId']) query: { newsId: number },
    @Body() @IdDecrement(['newsId']) body: NewsPayload,
  ): Promise<News[]> {
    return this.newsService.updateNews(query.newsId, body);
  }

  @Delete('delete')
  async deleteNews(
    @Query() @IdDecrement(['newsId']) query: { newsId: number },
  ): Promise<News[]> {
    return this.newsService.deleteNews(query.newsId);
  }
}
