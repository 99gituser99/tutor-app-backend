import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(dto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException('Невірний логін або пароль');
    }

    return user;
  }
}
