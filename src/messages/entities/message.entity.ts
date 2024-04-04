import { Max } from 'class-validator';
import { DialogEntity } from 'src/dialogs/entities/dialog.entity';
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

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Max(300)
  @Column()
  text: string;

  @Column({ default: false })
  isReaded: boolean;

  @ManyToOne(() => TutorEntity)
  @JoinColumn({ name: 'senderTutor' })
  senderTutor: TutorEntity;

  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'senderStudent' })
  senderStudent: StudentEntity;

  @Column()
  userRole: 'tutor' | 'student';

  @ManyToOne(() => DialogEntity, (dialog) => dialog.messages, {
    onDelete: 'CASCADE',
  })
  dialog: DialogEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  sendAt: Date;
}
