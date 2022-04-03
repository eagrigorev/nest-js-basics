import { Module } from '@nestjs/common';
import { NewsEntity } from '../../database/news/news.entity';
import { MailController } from '../../controllers/mail.controller';
import { NewsController } from '../../controllers/news.controller';
import { MailService } from '../mail/mail.service';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController, MailController],
  providers: [NewsService, MailService],
  exports: [NewsService],
})
export class NewsModule {}
