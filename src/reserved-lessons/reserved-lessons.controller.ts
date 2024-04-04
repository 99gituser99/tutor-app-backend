import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReservedLessonsService } from './reserved-lessons.service';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';
import { FilterReservedLessonDto } from './dto/filter-reserved-lessons.dto';
import { PaymentBodyDto } from './dto/PaymentBody.dto';

@Controller('reserved-lessons')
@ApiTags('reserved-lessons')
export class ReservedLessonsController {
  constructor(
    private readonly reservedLessonsService: ReservedLessonsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateReservedLessonDto) {
    return this.reservedLessonsService.create(dto);
  }

  @Post('/get')
  findAll(@Body() dto: FilterReservedLessonDto) {
    return this.reservedLessonsService.findAll(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/payment')
  paymentHandler(@Body() dto: PaymentBodyDto) {
    return this.reservedLessonsService.paymentHandler(dto);
  }

  @Post('/payment/confirmation')
  async paymentConfirmation(@Body() dto: any) {
    console.log(dto)
    if (dto.order_status === 'approved') {
      const orderDataString = dto.order_id;

      const ordersFieldsArray = orderDataString.split('//').map((el) => {
        const substr = el.split('=');
        if (
          substr[0] === 'tutor' ||
          substr[0] === 'student' ||
          substr[0] === 'duration' ||
          substr[0] === 'price'
        ) {
          return { [substr[0]]: Number(substr[1]) };
        } else {
          return { [substr[0]]: substr[1] };
        }
      });

      const orderData = ordersFieldsArray.reduce((obj, item) => {
        const key = Object.keys(item)[0];
        if (key && typeof item[key] !== 'undefined') {
          obj[key] = item[key];
        }
        return obj;
      }, {});

      const sameLessonExist = await this.reservedLessonsService.findByStartDate(
        orderData.tutor,
        orderData.startAt,
      );

      if (sameLessonExist) return dto;

      return this.reservedLessonsService.create({
        ...orderData,
        theme: '',
        status: 'planned',
      });
    }

    return dto;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedLessonsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReservedLessonDto) {
    return this.reservedLessonsService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedLessonsService.remove(+id);
  }
}
