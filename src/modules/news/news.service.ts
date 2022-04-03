import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from '../../database/news/news.entity';
import { NewsPayload } from '../../dto/news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    private readonly mailService: MailService,
  ) {}

  async getNewsAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find({ relations: ['comments'] });
  }

  async getNewsSingle(newsId: number): Promise<NewsEntity> {
    const _newsEntity = await this.newsRepository.findOneBy({ newsId });
    if (_newsEntity) {
      return _newsEntity;
    } else {
      throw new Error(`Error 404: Entry #${newsId} was not found!`);
    }
  }

  async createNewsSingle(news: NewsPayload): Promise<NewsEntity> {
    const _newsEntity = new NewsEntity();
    _newsEntity.title = news.title;
    _newsEntity.description = news.description;
    return await this.newsRepository.save(_newsEntity);
  }

  async updateNewsSingle(newsId: number, news: NewsPayload): Promise<string> {
    const _newsEntity = await this.newsRepository.findOneBy({ newsId });
    if (_newsEntity) {
      this.newsRepository.update(
        { newsId: newsId },
        {
          title: news.title,
          description: news.description,
          updatedAt: new Date(Date.now()),
        },
      );
      this.mailService.sendTestMail(news[newsId]);
      return `Entry #${newsId} was successfully updated. See it @ GET news/single?newsId=${newsId}.`;
    } else {
      throw new Error(`Error 404: Entry #${newsId} was not found!`);
    }
  }

  async deleteNewsSingle(newsId: number) {
    const _news = await this.getNewsSingle(newsId);
    this.newsRepository.remove(_news);
    return await `Entry #${newsId} was successfully deleted.`;
  }
}
