import { MessageEntity } from 'src/messages/entities/message.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dialogs')
export class DialogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.dialogs)
  @JoinColumn({ name: 'tutor' })
  tutor: TutorEntity;

  @ManyToOne(() => StudentEntity, (student) => student.dialogs)
  @JoinColumn({ name: 'student' })
  student: StudentEntity;

  @OneToMany(() => MessageEntity, (message) => message.dialog)
  @JoinColumn({ name: 'messages' })
  messages: MessageEntity[];

  @Column({ default: false })
  isTutorDelete: boolean;

  @Column({ default: false })
  isStudentDelete: boolean;
}
