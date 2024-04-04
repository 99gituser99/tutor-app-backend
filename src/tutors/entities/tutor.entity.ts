import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';
import { DialogEntity } from 'src/dialogs/entities/dialog.entity';
import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { ReservedLessonEntity } from 'src/reserved-lessons/entities/reserved-lesson.entity';
import { ReviewsEntity } from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tutors')
export class TutorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ default: 'tutor' })
  userRole: 'tutor';

  @Max(40)
  @Column()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @Min(6)
  @Max(30)
  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ default: '' })
  avatarUrl: string;

  @Column()
  @Column({ default: '' })
  description: string;

  @Min(0)
  @Max(5)
  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  studentsCount: number;

  @OneToMany(() => ReviewsEntity, (reviews) => reviews.recipient)
  reviews: ReviewsEntity[];

  @OneToMany(() => DialogEntity, (dialog) => dialog.tutor)
  dialogs: DialogEntity[];

  @OneToMany(() => LessonEntity, (lesson) => lesson.tutor)
  lessons: LessonEntity[];

  @OneToMany(() => ReservedLessonEntity, (lesson) => lesson.tutor)
  reservedLessons: ReservedLessonEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
