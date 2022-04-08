import { Module } from '@nestjs/common';
import { NewsEntity } from '../../database/news/news.entity';
import { MailController } from '../../controllers/mail.controller';
import { NewsController } from '../../controllers/news.controller';
import { MailService } from '../mail/mail.service';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../auth/roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../../database/users/users.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
    AuthModule,
  ],
  controllers: [NewsController, MailController],
  providers: [
    NewsService,
    MailService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [NewsService],
})
export class NewsModule {}
