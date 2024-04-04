import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsNotEmpty()
  @ApiProperty()
  sender: number;

  @IsNotEmpty()
  @ApiProperty()
  recipient: number;

  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @ApiProperty()
  rating: number;
}
