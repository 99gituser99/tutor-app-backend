import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsEntity } from './entities/review.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([ReviewsEntity, TutorEntity])],
})
export class ReviewsModule {}
