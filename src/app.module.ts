import { Module } from '@nestjs/common';
import { NewsModule } from './modules/news/news.module';
import { NewsController } from './controllers/news.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { CommentsController } from './controllers/comments.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './modules/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './controllers/app.controller';
import { JwtService } from '@nestjs/jwt';

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
    UsersModule,
    AuthModule,
  ],
  controllers: [NewsController, CommentsController, AppController],
  providers: [Array, AuthService, JwtService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
