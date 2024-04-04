import { ApiProperty } from '@nestjs/swagger';

export class CreateDialogDto {
  @ApiProperty()
  tutor: number;

  @ApiProperty()
  student: number;
}
