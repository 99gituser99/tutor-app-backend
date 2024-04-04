import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogEntity } from './entities/dialog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DialogsService {
  constructor(
    @InjectRepository(DialogEntity)
    private repository: Repository<DialogEntity>,
  ) {}

  create(dto: CreateDialogDto) {
    const dialog = this.repository.create({
      tutor: { id: dto.tutor },
      student: { id: dto.student },
    });

    return this.repository.save(dialog);
  }

  checkIsExist(tutorId: number, studentId: number) {
    return this.repository.findOne({
      where: { tutor: { id: tutorId }, student: { id: studentId } },
    });
  }

  findAll(userRole: 'tutor' | 'student', id: number) {
    let fieldName = userRole === 'tutor' ? 'isTutorDelete' : 'isStudentDelete';

    return this.repository.find({
      where: { [userRole]: { id }, [fieldName]: false },
      relations: {
        tutor: true,
        student: true,
      },
      select: {
        tutor: { id: true, name: true, avatarUrl: true },
        student: { id: true, name: true, avatarUrl: true },
      },
    });
  }

  async remove(id: number, userRole: 'tutor' | 'student') {
    const dialog = await this.repository.findOne({ where: { id } });

    if (!dialog) throw new NotFoundException('Діалог не знайдено');

    let fieldName = userRole === 'tutor' ? 'isTutorDelete' : 'isStudentDelete';

    const updatedDialog = await this.repository.save({
      ...dialog,
      [fieldName]: true,
    });

    // Якщо і студент і викладач видалили свій діалог - видаляю його з БД
    if (updatedDialog.isStudentDelete && updatedDialog.isTutorDelete) {
      const res = await this.repository.delete(id);

      if (res.affected === 0) {
        throw new NotFoundException('Діалог не знайдено');
      }
    }

    return id;
  }
}
