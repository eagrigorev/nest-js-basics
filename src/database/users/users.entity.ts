import { IsEnum } from 'class-validator';
import { Role } from '../../modules/auth/roles/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentsEntity } from '../comments/comments.entity';
import { NewsEntity } from '../news/news.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({ name: 'users_id' })
  usersId: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  @IsEnum(Role)
  roles: Role;

  @OneToMany(() => NewsEntity, (news) => news.user)
  news: NewsEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
