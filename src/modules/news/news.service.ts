import { Injectable } from '@nestjs/common';
import { News } from '../../dto/news.dto';

const news: News[] = [
  {
    newsId: 1,
    title: 'First news element',
    description: 'Some text describing the things',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        commentsId: 1,
        description: 'This is the first comment',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        commentsId: 2,
        description: 'Another comment',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ],
  },
  {
    newsId: 2,
    title: 'Second news element',
    description: 'Another text describing the things',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        commentsId: 1,
        description: 'Yet another comment',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ],
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

  async getNewsSingle(newsId: number): Promise<News> {
    const entry = news[newsId];
    if (entry) {
      return news[newsId];
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
            return `
              <article>
                ${comment.description} | Created: ${comment.createdAt}
              <article/>
            `;
          })}
        </section>
      </main>
    `;
  }

  async updateNews(newsId: number, data: News): Promise<News[]> {
    let existingNews = news[data.newsId];
    existingNews = {
      ...existingNews,
      ...data,
    };
    news[data.newsId] = existingNews;
    return news;
  }

  async deleteNews(newsId: number): Promise<News[]> {
    const entry = news[newsId];
    if (entry) {
      news.splice(newsId, newsId);
      return news;
    } else throw new Error('Entry not found!');
  }
}
