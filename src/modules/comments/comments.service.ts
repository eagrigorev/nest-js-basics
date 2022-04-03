import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../../database/news/news.entity';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../../database/comments/comments.entity';
import { CommentsPayload } from '../../dto/comments.dto';
import { NewsService } from '../news/news.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    private readonly newsService: NewsService,
  ) {}

  async getCommentsAll(newsId: number): Promise<CommentsEntity[]> {
    const _news = await this.newsService.getNewsSingle(newsId);
    return _news.comments;
  }

  async getCommentsSingle(
    newsId: number,
    commentsId: number,
  ): Promise<CommentsEntity> {
    const _news = await this.newsService.getNewsSingle(newsId);
    if (_news.comments[commentsId]) {
      return _news.comments[commentsId];
    } else
      throw new Error(
        `Error 404: Comment #${commentsId} of entry #${newsId} was not found!`,
      );
  }

  async createCommentsSingle(
    newsId: number,
    comment: CommentsPayload,
  ): Promise<NewsEntity> {
    const _newsEntity = await this.newsService.getNewsSingle(newsId);
    if (_newsEntity) {
      const _commentsEntity = new CommentsEntity();
      _commentsEntity.description = comment.description;
      _commentsEntity.avatar = comment.avatar;
      _commentsEntity.newsId = _newsEntity;
      this.commentsRepository.save(_commentsEntity);
      return await this.newsService.getNewsSingle(newsId);
    } else {
      throw new Error(`Error 404: Entry #${newsId} was not found!`);
    }
  }

  async updateCommentsSingle(
    newsId: number,
    commentsId: number,
    comment: CommentsPayload,
  ): Promise<string> {
    const _newsEntity = await this.newsService.getNewsSingle(newsId);
    if (_newsEntity) {
      const _commentsEntity = await this.commentsRepository.findOneBy({
        commentsId,
      });
      if (_commentsEntity) {
        this.commentsRepository.update(
          {
            commentsId: commentsId,
          },
          {
            description: comment.description,
            avatar: comment.avatar,
            updatedAt: new Date(Date.now()),
          },
        );
        return `Comment #${commentsId} for the entry #${newsId} was successfully updated. See it @ GET news/single?newsId=${newsId}.`;
      } else {
        throw new Error(`Error 404: Entry #${commentsId} was not found!`);
      }
    } else {
      throw new Error(`Error 404: Entry #${newsId} was not found!`);
    }
  }

  async uploadCommentsAvatar(
    newsId: number,
    commentsId: number,
    path: string,
  ): Promise<void> {
    const _newsEntity = await this.newsService.getNewsSingle(newsId);
    if (_newsEntity) {
      const _commentsEntity = await this.commentsRepository.findOneBy({
        commentsId,
      });
      if (_commentsEntity) {
        this.commentsRepository.update(
          {
            commentsId: commentsId,
          },
          {
            avatar: path,
          },
        );
      } else {
        throw new Error(`Error 404: Entry #${commentsId} was not found!`);
      }
    } else {
      throw new Error(`Error 404: Entry #${newsId} was not found!`);
    }
  }
}
