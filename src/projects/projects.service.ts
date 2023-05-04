import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interface/projects.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITask } from 'src/tasks/interface/tasks.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('projects')
    private projectModel: Model<IProject>,
    @InjectModel('tasks')
    private taskModel: Model<ITask>,
  ) { }
  async create(CreateProjectDto: CreateProjectDto): Promise<IProject> {
    const NewProject = await new this.projectModel(CreateProjectDto)
    return NewProject.save();
  }

  findAll():Promise<IProject[]> {
    return this.projectModel.find().populate("ListOfTasks", '', this.taskModel)
    .exec();
  }

  findOne(id: String): Promise<IProject> {
    return this.projectModel.findOne({_id:id}).populate("ListOfTasks", '', this.taskModel)
    .exec();
  }

  update(id: String, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.updateOne(({_id:id}),updateProjectDto) ;
  }

  remove(id: String) {
    return this.projectModel.deleteOne(({_id:id}));
  }
}
