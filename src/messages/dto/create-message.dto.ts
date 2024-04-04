import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  sender: {
    id: number;
    name: string;
  };

  @ApiProperty()
  dialog: number;

  @ApiProperty()
  userRole: 'tutor' | 'student';
}
