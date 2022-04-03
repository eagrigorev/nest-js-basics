import {
  Controller,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { NewsPayload } from '../dto/news.dto';
import { NewsEntity } from '../database/news/news.entity';
import { NewsService } from '../modules/news/news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('all')
  async getNewsAll(): Promise<NewsEntity[]> {
    return await this.newsService.getNewsAll();
  }

  @Get('single')
  async getNewsSingle(@Query() query: { newsId: number }): Promise<NewsEntity> {
    return await this.newsService.getNewsSingle(query.newsId);
  }

  @Post('add')
  async createNewsSingle(@Body() news: NewsPayload): Promise<NewsEntity> {
    return await this.newsService.createNewsSingle(news);
  }

  @Put('update')
  async updateNewsSingle(
    @Query() query: { newsId: number },
    @Body() news: NewsPayload,
  ): Promise<string> {
    return await this.newsService.updateNewsSingle(query.newsId, news);
  }

  @Delete('delete')
  async deleteNewsSingle(@Query() query: { newsId: number }): Promise<string> {
    return await this.newsService.deleteNewsSingle(query.newsId);
  }
}
