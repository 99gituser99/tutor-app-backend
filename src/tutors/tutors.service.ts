import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { TutorEntity } from './entities/tutor.entity';
import { UpdateTutorDto } from './dto/update-tutor.dto';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(TutorEntity)
    private repository: Repository<TutorEntity>,
  ) {}

  async create(dto: AuthDto) {
    const salt = await genSalt(10);

    const newUser = this.repository.create({
      password: await hash(dto.password, salt),
      userRole: dto.userRole as 'tutor',
      email: dto.email,
      name: dto.name,
    });

    const user = await this.repository.save(newUser);

    const { password: pass, ...result } = user;

    return result;
  }

  async findById(id: number) {
    const user = await this.repository.findOne({
      where: { id },
      relations: {
        lessons: { tutor: true },
        reviews: { sender: true },
        reservedLessons: true,
        dialogs: { student: true },
      },
      select: {
        lessons: {
          id: true,
          name: true,
          price: true,
          duration: true,
          tutor: {
            id: true,
            name: true,
          },
        },
        reviews: {
          id: true,
          message: true,
          rating: true,
          sender: {
            id: true,
            name: true,
            avatarUrl: true,
            userRole: true,
          },
          createdAt: true,
        },
        reservedLessons: {
          id: true,
          name: true,
          duration: true,
          startAt: true,
        },
        dialogs: {
          id: true,
          student: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!user) new NotFoundException();
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOneBy({ email });
    if (!user) new NotFoundException();
    return user;
  }

  async update(id: number, dto: UpdateTutorDto) {
    const tutor = await this.findById(id);

    if (dto.password) {
      const salt = await genSalt(10);
      const passwordHash = await hash(dto.password, salt);

      return this.repository.save({ ...tutor, ...dto, password: passwordHash });
    } else {
      return this.repository.save({ ...tutor, ...dto });
    }
  }
}
