import { Injectable } from '@nestjs/common';
import { News } from './dto/news.dto';

const news: News[] = [
  {
    id: 1,
    title: 'First news element',
    description: 'Some text describing the things',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

@Injectable()
export class NewsService {
  private readonly news: News[] = [];

  async createNews(data: News): Promise<News[]> {
    news.push(data);
    return news;
  }

  async getNewsAll(): Promise<News[]> {
    return news;
  }

  async getNewsSingle(id: number): Promise<News> {
    const entry = news[id];
    if (entry) {
      return news[id];
    } else throw new Error('Error 404: Entry not found!');
  }

  async updateNews(id: number, data: News): Promise<News[]> {
    let existingNews = news[data.id];
    existingNews = {
      ...existingNews,
      ...data,
    };
    news[data.id] = existingNews;
    return news;
  }

  async deleteNews(id: number): Promise<News[]> {
    const entry = news[id];
    if (entry) {
      news.splice(id, id);
      return news;
    } else throw new Error('Entry not found!');
  }
}
