import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('dialogs')
@Controller('dialogs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Post()
  create(@Body() dto: CreateDialogDto) {
    return this.dialogsService.create(dto);
  }

  @Get(':id/:userRole')
  findAll(
    @Param('id') id: string,
    @Param('userRole') userRole: 'tutor' | 'student',
  ) {
    return this.dialogsService.findAll(userRole, +id);
  }

  @Get('/check-is-exist/:tutorId/:studentId')
  checkIsExist(
    @Param('tutorId') tutorId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.dialogsService.checkIsExist(+tutorId, +studentId);
  }

  @Delete(':id/:userRole')
  remove(
    @Param('id') id: string,
    @Param('userRole') userRole: 'tutor' | 'student',
  ) {
    return this.dialogsService.remove(+id, userRole);
  }
}
