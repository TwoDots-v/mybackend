import { Injectable } from '@nestjs/common';
import { CreateLeafDto } from './dto/create-leaf.dto';
import { UpdateLeafDto } from './dto/update-leaf.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILeave } from './interface/leaves.interface';

@Injectable()
export class LeavesService {
  constructor(
    @InjectModel('leaves')
    private leaveModel: Model<ILeave>,
  ) { }

  async create(createLeafDto: CreateLeafDto): Promise<ILeave> {
    const NewLeave = await new this.leaveModel(createLeafDto)
    return NewLeave.save();
  }

  findAll():Promise<ILeave[]> {
    return this.leaveModel.find().exec();
  }

  findOne(id: String): Promise<ILeave> {
    return this.leaveModel.findOne({_id:id}).exec();
  }

  update(id: String, updateLeafDto: UpdateLeafDto) {
    return this.leaveModel.updateOne(({_id:id}),updateLeafDto) ;
  }

  remove(id: String) {
    return this.leaveModel.deleteOne(({_id:id}));
  }
}
