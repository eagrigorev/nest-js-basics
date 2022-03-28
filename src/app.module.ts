import { Module } from '@nestjs/common';
import { NewsModule } from './modules/news/news.module';
import { CalcModule } from './modules/calc/calc.module';
import { CommentsModule } from './modules/comments/comments.module';
import { NewsController } from './controllers/news.controller';
import { CalcController } from './controllers/calc.controller';
import { CommentsController } from './controllers/comments.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    NewsModule,
    CalcModule,
    CommentsModule,
    MulterModule.register({ dest: './upload' }),
  ],
  controllers: [NewsController, CalcController, CommentsController],
  providers: [Array],
})
export class AppModule {}
