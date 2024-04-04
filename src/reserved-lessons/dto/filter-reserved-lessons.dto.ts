import { ApiProperty } from '@nestjs/swagger';

export class FilterReservedLessonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  student?: number;

  @ApiProperty()
  tutor?: number;

  @ApiProperty({ default: 'price-desc' })
  sortBy: 'price-desc' | 'price-asc' | 'reviews-desc' | 'rating-desc';

  @ApiProperty({ default: 1 })
  currentPage: number;

  @ApiProperty({ default: 20 })
  pageSize: number;
}
