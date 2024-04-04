import { Max, Min } from 'class-validator';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reviews')
export class ReviewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudentEntity, (student) => student.reviews, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'sender' })
  sender: StudentEntity;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.reviews, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'recipient' })
  recipient: TutorEntity;

  @Column()
  message: string;

  @Min(0)
  @Max(5)
  @Column()
  rating: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
