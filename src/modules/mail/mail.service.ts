import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NewsEntity } from '../../database/news/news.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestMail(news: NewsEntity) {
    console.log(__dirname);
    return this.mailerService
      .sendMail({
        to: 'gb-test-nest@mail.ru',
        subject: 'News have been updated',
        template: 'test',
        context: news,
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
