import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  tutor: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  theme?: number;
}
