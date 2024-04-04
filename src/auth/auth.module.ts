import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TutorsModule } from 'src/tutors/tutors.module';
import { StudentModule } from 'src/student/student.module';
import { LocalStrategy } from './strategies/local.strategy';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import { StudentEntity } from 'src/student/entities/student.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('EXPIRES_IN') },
        };
      },
    }),
    TutorsModule,
    StudentModule,
    PassportModule,
    TypeOrmModule.forFeature([TutorEntity, StudentEntity]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
