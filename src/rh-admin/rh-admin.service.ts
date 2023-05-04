import { Injectable } from '@nestjs/common';
import { CreateRhAdminDto } from './dto/create-rh-admin.dto';
import { UpdateRhAdminDto } from './dto/update-rh-admin.dto';
import { Iadmin } from './interface/rh-admin.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RhAdmindocument } from './entities/rh-admin.entity';

@Injectable()
export class RhAdminService {
  constructor(
    @InjectModel('rh-admin')
    private RhAdminModel: Model< RhAdmindocument>,
  ) { }

  async create(createUserDto: CreateRhAdminDto): Promise<Iadmin> {
    const NewUser = await new this.RhAdminModel(createUserDto)
    return NewUser.save();
  }

  findAll():Promise<Iadmin[]> {
    return this.RhAdminModel.find().exec();
  }

  findOne(id: String): Promise<Iadmin> {
    return this.RhAdminModel.findOne({_id:id}).exec();
  }

  update(id: String, updateRhAdminDto: UpdateRhAdminDto) {
    console.log("*****UPDATED DTO IS********",updateRhAdminDto)
   return this.RhAdminModel.findByIdAndUpdate({_id:id},updateRhAdminDto)
  }

  remove(id: String) {
    return this.RhAdminModel.deleteOne(({_id:id}));
  }
}
