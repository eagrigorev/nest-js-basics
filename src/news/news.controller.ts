import {
  Controller,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { News } from './dto/news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('single')
  async getNewsSingle(@Query() query: { id: number }): Promise<News> {
    return this.newsService.getNewsSingle(query.id);
  }

  @Get('all')
  async getNewsAll(): Promise<News[]> {
    return this.newsService.getNewsAll();
  }

  @Put('add')
  async createNews(@Body() body: News): Promise<News[]> {
    return this.newsService.createNews(body);
  }

  @Post('update')
  async updateNews(
    @Query() query: { id: number },
    @Body() body: News,
  ): Promise<News[]> {
    return this.newsService.updateNews(query.id, body);
  }

  @Delete('delete')
  async deleteNews(@Query() query: { id: number }): Promise<News[]> {
    return this.newsService.deleteNews(query.id);
  }
}
