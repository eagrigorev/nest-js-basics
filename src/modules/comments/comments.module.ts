import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from '../../database/comments/comments.entity';
import { CommentsController } from '../../controllers/comments.controller';
import { NewsModule } from '../news/news.module';
import { CommentsService } from './comments.service';
import { NewsController } from '../../controllers/news.controller';
import { NewsService } from '../news/news.service';
import { NewsEntity } from '../../database/news/news.entity';
import { MailController } from '../../controllers/mail.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    NewsModule,
    TypeOrmModule.forFeature([CommentsEntity]),
    TypeOrmModule.forFeature([NewsEntity]),
  ],
  controllers: [CommentsController, NewsController, MailController],
  providers: [CommentsService, NewsService, MailService],
  exports: [CommentsService],
})
export class CommentsModule {}
