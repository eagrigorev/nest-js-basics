import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NewsEntity } from '../news/news.entity';
import { UsersEntity } from '../users/users.entity';

@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn({ name: 'comments_id' })
  commentsId: number;

  @Column('text')
  description: string;

  @Column('text')
  avatar: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => NewsEntity)
  @JoinColumn()
  newsId!: NewsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.usersId)
  user: UsersEntity;
}
