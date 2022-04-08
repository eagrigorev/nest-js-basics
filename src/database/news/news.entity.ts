import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentsEntity } from '../comments/comments.entity';
import { UsersEntity } from '../users/users.entity';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn({ name: 'news_id' })
  newsId: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => CommentsEntity, (comment) => comment.newsId)
  comments!: CommentsEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.usersId)
  user: UsersEntity;
}
