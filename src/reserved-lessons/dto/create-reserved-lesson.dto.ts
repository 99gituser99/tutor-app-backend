import { ApiProperty } from '@nestjs/swagger';

export class CreateReservedLessonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ default: 'planned' })
  status?: 'planned' | 'conducted';

  @ApiProperty({ default: 60 })
  duration: number;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  tutor: number;

  @ApiProperty()
  student: number;
}
