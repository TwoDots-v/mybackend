import { Module } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './entities/project.entity';
import { TaskSchema } from 'src/tasks/entities/task.entity';
@Module({
  imports:[MongooseModule.forFeature([{schema:ProjectSchema, name:'projects'}]),
          MongooseModule.forFeature([{schema:TaskSchema, name:'tasks'}])],
  controllers: [ProjectsController],
  providers: [ProjectService]
})
export class ProjectsModule {}
