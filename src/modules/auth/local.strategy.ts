import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const _userEntity = await this.authService.validateUser(email, password);
    if (!_userEntity) {
      throw new UnauthorizedException();
    }
    const user = {
      ..._userEntity,
    };
    return user;
  }
}
