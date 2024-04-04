import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
@ApiTags('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  createMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(dto);
  }

  @Patch(':id')
  updateIsReading(@Param() id: string) {
    return this.messagesService.updateIsReading(+id);
  }

  @Get(':id')
  getMessages(@Param() params: { id: string }) {
    return this.messagesService.getMessages(+params.id);
  }

  @Delete(':id')
  removeMessage(@Param('id') id: string) {
    return this.messagesService.removeMessage(+id);
  }
}
