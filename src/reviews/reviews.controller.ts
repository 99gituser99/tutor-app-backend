import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
@ApiTags('reviews')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Get(':id')
  findByTutorId(@Param('id') id: string) {
    return this.reviewsService.findAll(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
