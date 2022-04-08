import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPayload } from '../../dto/users.dto';
import { UsersEntity } from '../../database/users/users.entity';
import { Repository } from 'typeorm';
import { Role } from '../auth/roles/roles.enum';
import { hash } from '../../utils/crypto';

export type User = any;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async createUsersSingle(user: UsersPayload): Promise<UsersEntity> {
    const _usersEntity = new UsersEntity();
    _usersEntity.name = user.name;
    _usersEntity.email = user.email;
    _usersEntity.roles = user.roles;
    _usersEntity.password = await hash(user.password);
    return await this.usersRepository.save(_usersEntity);
  }

  async getUserById(usersId: number): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ usersId });
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ email });
  }

  async setUsersRoleModerator(usersId: number): Promise<string> {
    const _usersEntity = await this.usersRepository.findOneBy({ usersId });
    if (_usersEntity) {
      _usersEntity.roles = Role.Moderator;
      this.usersRepository.save(_usersEntity);
      return `Role set successfully.`;
    } else {
      throw new UnauthorizedException();
    }
  }
}
