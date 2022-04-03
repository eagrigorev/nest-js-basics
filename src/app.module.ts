import { Module } from '@nestjs/common';
import { NewsModule } from './modules/news/news.module';
import { NewsController } from './controllers/news.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { CommentsController } from './controllers/comments.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './modules/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'super',
      database: 'news_db',
      entities: [],
      //migrations: [],
      //migrationsTableName: 'news_db_migrations',
      synchronize: true,
      autoLoadEntities: true,
    }),
    NewsModule,
    CommentsModule,
    MulterModule.register({ dest: './upload' }),
    MailModule,
  ],
  controllers: [NewsController, CommentsController],
  providers: [Array],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
