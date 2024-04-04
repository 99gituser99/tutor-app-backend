import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';
import { DialogEntity } from 'src/dialogs/entities/dialog.entity';
import { ReservedLessonEntity } from 'src/reserved-lessons/entities/reserved-lesson.entity';
import { ReviewsEntity } from 'src/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ default: 'student' })
  userRole: 'student';

  @Max(40)
  @IsNotEmpty()
  @Column()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @Min(6)
  @Max(30)
  @IsNotEmpty()
  @Column()
  password: string;

  @Column({ default: '' })
  avatarUrl: string;

  @OneToMany(() => DialogEntity, (dialog) => dialog.student)
  dialogs: DialogEntity[];

  @OneToMany(() => ReservedLessonEntity, (lesson) => lesson.student)
  reservedLessons: ReservedLessonEntity[];

  @OneToMany(() => ReviewsEntity, (reviews) => reviews.sender)
  reviews: ReviewsEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
