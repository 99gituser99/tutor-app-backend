import { IsNotEmpty } from 'class-validator';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lessons')
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Назва дисципліни
  @IsNotEmpty()
  @Column()
  name: string;

  // Ціна уроку
  @IsNotEmpty()
  @Column()
  price: number;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.lessons)
  tutor: TutorEntity;

  // Тривалість уроку в хвилинах
  @Column()
  duration: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
