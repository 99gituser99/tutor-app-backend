import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTutorDto } from './create-tutor.dto';

export class UpdateTutorDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  avatarUrl?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  description?: string;
}
