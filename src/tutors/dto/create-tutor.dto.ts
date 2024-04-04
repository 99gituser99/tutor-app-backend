import { ApiProperty } from '@nestjs/swagger';

export class CreateTutorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
