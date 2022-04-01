import { Module } from '@nestjs/common';
import { MailController } from '../../controllers/mail.controller';
import { NewsController } from '../../controllers/news.controller';
import { MailService } from '../mail/mail.service';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController, MailController],
  providers: [NewsService, MailService],
  exports: [NewsService],
})
export class NewsModule {}
