import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { ILeave } from 'src/leaves/interface/leaves.interface';
import { ITask } from 'src/tasks/interface/tasks.interface';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private userModel: Model<IUser>,
    @InjectModel('leaves')
    private leavesModel: Model<ILeave>,
    @InjectModel('tasks')
    private taskModel: Model<ITask>,
    private mailerService: MailerService
  ) { }
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const NewUser = await new this.userModel(createUserDto)
    return NewUser.save();
  }

  findAll():Promise<IUser[]> {
    return this.userModel.find()
    .populate("Task",'',this.taskModel)
    .populate("ListOfLeaves", '', this.leavesModel)
    .exec();
  }

  findOne(id: String): Promise<IUser> {
    return this.userModel.findOne({_id:id})
    .populate("ListOfLeaves", '', this.leavesModel)
    .populate("Task",'',this.taskModel)
    .exec();
  }

  update(id: String, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(({_id:id}),updateUserDto) ;
  }

  remove(id: String) {
    return this.userModel.deleteOne(({_id:id}));
  }
  update2(id: String, updateUserDto: UpdateUserDto): Promise<IUser> {
    console.log("id in userService is:", id);
    console.log("updateUserDto", updateUserDto);
    return this.userModel.findByIdAndUpdate({_id: id}, updateUserDto)
  }
  
  async getUserByEmail(email: String): Promise<IUser> {
    const existingUser = await this.userModel.findOne({email: email}).exec();
    if(!existingUser){
      throw new NotFoundException('Can not find user');
    }
    return existingUser;

  }


    async sendUserConfirmation(user: any, token: string) {
  const url = `index2.html/auth/confirm?token=${token}`;
 // const url=`index2.html`
    console.log("*****URL*****",url)
   // console.log("*****mailerService*****",mailerService)
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to WorkMate! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // :pencil2: filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
  async findItems(items:string):Promise<IUser[]>{
    console.log("items:",items)
    const list = await this.userModel.find().select('items').exec();
    return list;
  }
  // async SENDMAIL(data:string){
  //   console.log("*********",data)
  //   await this.mailerService.sendMail({
  //     to:data,
  //     from:"rima@test.fr",
  //     subject:"simple test",
  //     text:"welcome"
  //   })
  // }
}