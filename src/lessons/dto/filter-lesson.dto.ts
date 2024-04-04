import { ApiProperty } from '@nestjs/swagger';

export class FilterLessonDto {
  // lesson name
  @ApiProperty()
  name: string;

  @ApiProperty()
  tutorName: string;

  @ApiProperty({ default: [0, 3000] })
  price: [number, number];

  @ApiProperty({ default: 'price-desc' })
  sortBy: 'price-desc' | 'price-asc' | 'reviews-desc' | 'rating-desc';

  @ApiProperty({ default: 1 })
  currentPage: number;

  @ApiProperty({ default: 20 })
  pageSize: number;
}
