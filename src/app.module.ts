import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TutorsModule } from './tutors/tutors.module';
import { TutorEntity } from './tutors/entities/tutor.entity';
import { StudentModule } from './student/student.module';
import { FilesModule } from './files/files.module';
import { StudentEntity } from './student/entities/student.entity';
import { FileEntity } from './files/entities/file.entity';
import { LessonsModule } from './lessons/lessons.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LessonEntity } from './lessons/entities/lesson.entity';
import { ReviewsEntity } from './reviews/entities/review.entity';
import { MessagesModule } from './messages/messages.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { ReservedLessonsModule } from './reserved-lessons/reserved-lessons.module';
import { ReservedLessonEntity } from './reserved-lessons/entities/reserved-lesson.entity';
import { DialogEntity } from './dialogs/entities/dialog.entity';
import { MessageEntity } from './messages/entities/message.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        TutorEntity,
        StudentEntity,
        LessonEntity,
        ReservedLessonEntity,
        FileEntity,
        ReviewsEntity,
        DialogEntity,
        MessageEntity,
      ],
      synchronize: true,
    }),
    TutorsModule,
    StudentModule,
    FilesModule,
    LessonsModule,
    ReviewsModule,
    MessagesModule,
    DialogsModule,
    ReservedLessonsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
