import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6, { message: 'Мінімальна довжина паролю 6 символів' })
  @IsString()
  password: string;

  @ApiProperty()
  @MinLength(3, { message: 'Мінімальна довжина 3 символа' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  userRole: 'tutor' | 'student';
}
