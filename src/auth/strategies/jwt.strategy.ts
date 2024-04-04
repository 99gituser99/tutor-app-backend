import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TutorsService } from 'src/tutors/tutors.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly tutorService: TutorsService,
    private readonly studentService: TutorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string; userRole: 'tutor' | 'student' }) {
    let user;

    if (payload.userRole === 'tutor') {
      user = await this.tutorService.findById(+payload.id);
    }

    if (payload.userRole === 'student') {
      user = await this.studentService.findById(+payload.id);
    }

    if (!user) {
      throw new UnauthorizedException('У Вас немає доступу');
    }

    return { id: user.id };
  }
}
