import { Injectable } from '@nestjs/common';
import { News, NewsPayload } from '../../dto/news.dto';
import { news } from '../../utils/fakeDatabase';
import { MailService } from '../mail/mail.service';

let newsIdGlobal = 3;

@Injectable()
export class NewsService {
  constructor(private mailService: MailService) {}

  private readonly news: News[] = [];

  async createNews(data: NewsPayload): Promise<News[]> {
    const newNewsEntry: News = {
      ...data,
      newsId: newsIdGlobal,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };
    newsIdGlobal++;
    news.push(newNewsEntry);
    return news;
  }

  async getNewsAll(): Promise<News[]> {
    return news;
  }

  // async getNewsSingle(newsId: number): Promise<News> {
  //   const entry = news[newsId];
  //   if (entry) {
  //     return news[newsId];
  //   } else throw new Error('Error 404: Entry not found!');
  // }

  getNewsSingle(newsId: number): News {
    const entry = news[newsId];
    if (entry) {
      return { ...entry };
    } else throw new Error('Error 404: Entry not found!');
  }

  async getNewsSingleDisplay(newsId: number): Promise<string> {
    const entry = news[newsId];
    return `
      <header>
        <h2>${entry.title}</h2>   
      </header>
      <main>
        <section>
          <p>${entry.description}</p>
          <p>Created: ${entry.createdAt} | Updated: ${entry.updatedAt}</p>
        </section>
        <section>
          <h3>Comments</h3>
          ${entry.comments.map((comment) => {
            const avatarPath = comment.avatar.split('\\').pop();
            return `
              <article>
                <img src="/upload/${avatarPath}" alt="Avatar" width="100" height="100">
                ${comment.description} | Created: ${comment.createdAt}
              <article/>
            `;
          })}
        </section>
      </main>
    `;
  }

  async updateNews(newsId: number, data: NewsPayload): Promise<News> {
    let existingNews = news[newsId];
    existingNews = {
      ...existingNews,
      ...data,
      updatedAt: new Date(Date.now()),
    };
    news[newsId] = existingNews;
    this.mailService.sendTestMail(news[newsId]);
    return news[newsId];
  }

  async deleteNews(newsId: number): Promise<News[]> {
    const entry = news[newsId];
    if (entry) {
      news.splice(newsId, newsId);
      return news;
    } else throw new Error('Entry not found!');
  }
}
