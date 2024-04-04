import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DialogsService } from './dialogs.service';
import { DialogsController } from './dialogs.controller';
import { DialogEntity } from './entities/dialog.entity';

@Module({
  controllers: [DialogsController],
  providers: [DialogsService],
  imports: [TypeOrmModule.forFeature([DialogEntity])],
})
export class DialogsModule {}
