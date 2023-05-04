import { Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveSchema } from './entities/leaf.entity';
@Module({
  imports:[MongooseModule.forFeature([{schema:LeaveSchema, name:'leaves'}])],
  controllers: [LeavesController],
  providers: [LeavesService]
})
export class LeavesModule {}
