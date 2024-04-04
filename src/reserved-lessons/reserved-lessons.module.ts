import { Module } from '@nestjs/common';
import { ReservedLessonsService } from './reserved-lessons.service';
import { ReservedLessonsController } from './reserved-lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservedLessonEntity } from './entities/reserved-lesson.entity';

@Module({
  controllers: [ReservedLessonsController],
  providers: [ReservedLessonsService],
  imports: [TypeOrmModule.forFeature([ReservedLessonEntity])],
})
export class ReservedLessonsModule {}
