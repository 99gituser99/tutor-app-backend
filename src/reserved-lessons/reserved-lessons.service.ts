const crypto = require('crypto');
const path = require('path');
const fs = require('fs').promises;
import { google } from 'googleapis';
import { InjectRepository } from '@nestjs/typeorm';
import { authenticate } from '@google-cloud/local-auth';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Equal, FindOptionsWhereProperty, ILike, Repository } from 'typeorm';

import { ReservedLessonEntity } from './entities/reserved-lesson.entity';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';
import { FilterReservedLessonDto } from './dto/filter-reserved-lessons.dto';
import { PaymentBodyDto } from './dto/PaymentBody.dto';

@Injectable()
export class ReservedLessonsService {
  constructor(
    @InjectRepository(ReservedLessonEntity)
    private repository: Repository<ReservedLessonEntity>,
  ) {}

  async create(dto: CreateReservedLessonDto) {
    const lesson = this.repository.create({
      ...dto,
      tutor: { id: dto.tutor },
      student: { id: dto.student },
      meetUrl: '',
    });

    return this.repository.save(lesson);
  }

  async findAll(dto: FilterReservedLessonDto) {
    let options: FindOptionsWhereProperty<ReservedLessonEntity> = {};

    if (dto.name) {
      options = {
        name: ILike(`%${dto.name}%`),
      };
    }

    // [0] = fieldName; [1] = direction ASC or DESC
    const sortDirection = dto.sortBy.split('-');
    const skip = dto.currentPage * dto.pageSize - dto.pageSize;

    const [entities, count] = await this.repository.findAndCount({
      where: {
        ...options,
        tutor: { id: dto.tutor },
        student: { id: dto.student },
      },
      relations: { tutor: true, student: true },
      select: {
        tutor: { id: true, name: true, avatarUrl: true },
        student: { id: true, name: true, avatarUrl: true },
      },
      order: { [sortDirection[0]]: sortDirection[1].toUpperCase() },
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

  // get full lesson
  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: { tutor: true, student: true, files: true },
      select: {
        tutor: { id: true, name: true, avatarUrl: true },
        student: { id: true, name: true, avatarUrl: true },
        files: {
          id: true,
          originalName: true,
          authorRole: true,
          createdAt: true,
          filename: true,
          mimetype: true,
          size: true,
        },
      },
    });
  }

  findByStartDate(id: number, startAt: Date) {
    const date = new Date(startAt);
    return this.repository.findOne({
      where: { tutor: { id }, startAt: date },
    });
  }

  async update(id: number, dto: UpdateReservedLessonDto) {
    const lesson = await this.repository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException('Урок не знайдено');
    }

    return this.repository.save({
      ...lesson,
      ...dto,
    });
  }

  async paymentHandler(dto: PaymentBodyDto) {
    const fondyPassword = 'test';

    const order_id = `name=${dto.name}//duration=${dto.duration}//price=${dto.price}//startAt=${dto.startAt}//student=${dto.student}//tutor=${dto.tutor}//createdAt=${Date.now()}`;

    const orderBody = {
      // response_url: 'http://localhost:5173/',
      server_callback_url: `${process.env.NRGOK_FORWARDING}/reserved-lessons/payment/confirmation`,
      order_id: order_id,
      merchant_id: '1396424',
      order_desc: dto.name,
      amount: dto.price * 100,
      currency: 'UAH',
    };

    const orderKeys = Object.keys(orderBody).sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    const signatureRaw = orderKeys.map((v) => orderBody[v]).join('|');
    const sugnature = crypto.createHash('sha1');

    sugnature.update(`${fondyPassword}|${signatureRaw}`);

    const json = JSON.stringify({
      request: { ...orderBody, signature: sugnature.digest('hex') },
    });

    const response = await fetch('https://pay.fondy.eu/api/checkout/url/', {
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = await response.json();

    return data;
  }

  async remove(id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Урок не знайдено');
    }

    return id;
  }
}
