import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { LeaveSchema } from 'src/leaves/entities/leaf.entity';
import { TaskSchema } from 'src/tasks/entities/task.entity';
import { RhAdmin, RhAdminSchema } from 'src/rh-admin/entities/rh-admin.entity';
@Module({
  imports:[MongooseModule.forFeature([{schema:UserSchema, name:'user',discriminators:[{name:RhAdmin.name,schema:RhAdminSchema}]}]),
MongooseModule.forFeature([{schema:LeaveSchema, name:'leaves'}]),
MongooseModule.forFeature([{schema:TaskSchema, name:'tasks'}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
