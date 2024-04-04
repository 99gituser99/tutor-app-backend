import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { FindOptionsWhereProperty, ILike, Between, Repository } from 'typeorm';
import { FilterLessonDto } from './dto/filter-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private repository: Repository<LessonEntity>,
  ) {}

  create(dto: CreateLessonDto) {
    const lesson = this.repository.create({ ...dto, tutor: { id: dto.tutor } });
    return this.repository.save(lesson);
  }

  async findAll(dto: FilterLessonDto) {
    let options: FindOptionsWhereProperty<LessonEntity> = {};

    if (dto.name) {
      options = {
        name: ILike(`%${dto.name}%`),
      };
    }

    if (dto.tutorName) {
      options = { ...options, tutor: { name: ILike(`%${dto.tutorName}%`) } };
    }

    if (dto.price) {
      options = { ...options, price: Between(dto.price[0], dto.price[1]) };
    }

    // [0] = fieldName; [1] = direction ASC or DESC
    const sortDirection = dto.sortBy.split('-');
    const skip = dto.currentPage * dto.pageSize - dto.pageSize;

    const [entities, count] = await this.repository.findAndCount({
      where: { ...options },
      order: { [sortDirection[0]]: sortDirection[1].toUpperCase() },
      relations: { tutor: { lessons: true, reviews: true } },
      select: {
        tutor: {
          id: true,
          name: true,
          reviews: {
            id: true,
          },
          rating: true,
          avatarUrl: true,
          description: true,
          studentsCount: true,
          lessons: {
            id: true,
            name: true,
          },
        },
      },
      skip: skip,
      take: dto.pageSize,
    });

    return {
      entities,
      totalCount: count,
      page: dto.currentPage,
      size: dto.pageSize,
    };
  }

  async update(id: number, dto: UpdateLessonDto) {
    const lesson = await this.repository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException('Урок не знайдено');
    }

    return this.repository.save({
      ...lesson,
      ...dto,
    });
  }

  async remove(id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Урок не знайдено');
    }

    return id;
  }
}
