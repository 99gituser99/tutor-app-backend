import { IsNotEmpty } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reserved-lessons')
export class ReservedLessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Назва уроку
  @IsNotEmpty()
  @Column()
  name: string;

  // Тема уроку (не обов`язково)
  @Column({ default: null })
  theme: string | null;

  // Ціна уроку
  @IsNotEmpty()
  @Column()
  price: number;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.lessons)
  tutor: TutorEntity;

  @ManyToOne(() => StudentEntity, (tutor) => tutor.reservedLessons)
  student: StudentEntity;

  // Статус уроку
  @Column({ default: 'planned' })
  status: 'planned' | 'conducted';

  // Тривалість уроку в хвилинах
  @Column()
  duration: number;

  // Початок уроку:
  @Column()
  startAt: Date;

  @OneToMany(() => FileEntity, (file) => file.lesson, { onDelete: 'CASCADE' })
  files: FileEntity[];

  @Column()
  meetUrl: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
