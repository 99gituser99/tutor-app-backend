import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsEntity)
    private repository: Repository<ReviewsEntity>,

    @InjectRepository(TutorEntity)
    private tutorRepository: Repository<TutorEntity>,
  ) {}

  async calculateTutorRating(recepientId: number) {
    const allReviews = await this.repository.find({
      where: { recipient: { id: recepientId } },
    });

    if (allReviews.length) {
      const totalRating = allReviews.reduce(
        (acc, curr) => acc + curr.rating,
        0,
      );

      const averageRating = Math.round(totalRating / allReviews.length);

      const tutor = await this.tutorRepository.findOne({
        where: { id: recepientId },
      });

      this.tutorRepository.save({ id: tutor.id, rating: averageRating });
    }
  }

  async create(dto: CreateReviewDto) {
    if (!dto.message || !dto.rating || !dto.recipient || !dto.sender) {
      throw new BadRequestException('Вибрані не всі дані');
    }

    const reviews = this.repository.create({
      message: dto.message,
      rating: dto.rating,
      sender: { id: dto.sender },
      recipient: { id: dto.recipient },
    });

    const newReviews = await this.repository.save(reviews);

    await this.calculateTutorRating(dto.recipient);

    return newReviews;
  }

  findAll(id: number) {
    return this.repository.find({
      where: { recipient: { id: id } },
      order: { createdAt: 'ASC' },
    });
  }

  async remove(id: number) {
    const review = await this.repository.findOne({
      where: { id },
      relations: { recipient: true },
    });

    if (!review) {
      throw new NotFoundException('Відгук не знайдено');
    }

    await this.calculateTutorRating(review.recipient.id);

    await this.repository.delete(id);

    return id;
  }
}
