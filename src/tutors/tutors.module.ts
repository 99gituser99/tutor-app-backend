import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { TutorEntity } from './entities/tutor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TutorsController],
  providers: [TutorsService],
  imports: [TypeOrmModule.forFeature([TutorEntity])],
  exports: [TutorsService],
})
export class TutorsModule {}
