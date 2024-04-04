import { ApiProperty } from '@nestjs/swagger';

export class UpdateLessonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  duration: number;
}
