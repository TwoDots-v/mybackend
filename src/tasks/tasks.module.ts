import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './entities/task.entity';
import { ProjectSchema } from 'src/projects/entities/project.entity';
import { ProjectService } from 'src/projects/projects.service';

@Module({
  imports:[MongooseModule.forFeature([{schema:TaskSchema, name:'tasks'}]),MongooseModule.forFeature([{schema:ProjectSchema, name:'projects'}])],
  controllers: [TasksController],
  providers: [ProjectService,TasksService]
})
export class TasksModule {}
