import { Module } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageEntity } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogsGateway } from './messages.gateway';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, DialogsGateway],
  imports: [TypeOrmModule.forFeature([MessageEntity, MessagesService])],
  exports: [MessagesService],
})
export class MessagesModule {}
