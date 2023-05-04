import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask } from './interface/tasks.interface';
import { IProject } from 'src/projects/interface/projects.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('tasks')
    private taskModel: Model<ITask>,
    @InjectModel('projects')
    private projectModel: Model<IProject>
  ) { }

  async create(CreateTaskDto: CreateTaskDto): Promise<ITask> {
    const NewTask = await new this.taskModel(CreateTaskDto)
    await this.projectModel.updateOne({_id:CreateTaskDto.IdProject},
      {$push:{ListOfTasks:NewTask._id}})
    return NewTask.save();
  }

  findAll():Promise<ITask[]> {
    return this.taskModel.find().exec();
  }


  findOne(id: String): Promise<ITask> {
    return this.taskModel.findOne({_id:id}).exec();
  }

  update(id: String, UpdateTaskDto: UpdateTaskDto) {
    return this.taskModel.updateOne(({_id:id}),UpdateTaskDto) ;
  }

  async remove(id: string): Promise<void> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    const projectId = task.IdProject;
    await Promise.all([
      this.taskModel.deleteOne({ _id: id }).exec(),
      this.projectModel.updateOne(
        { _id: projectId },
        { $pull: { ListOfTasks: id } }
      ).exec(),
    ]);
  }
}
