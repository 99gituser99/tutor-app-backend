import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonEntity } from './entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [TypeOrmModule.forFeature([LessonEntity])],
})
export class LessonsModule {}
