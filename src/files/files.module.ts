import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TutorsModule } from 'src/tutors/tutors.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    AuthModule,
    TutorsModule,
    StudentModule,
  ],
})
export class FilesModule {}
