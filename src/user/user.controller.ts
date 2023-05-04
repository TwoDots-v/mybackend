import { Controller, Get, Post, Body, Patch, Param, Delete,Res, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiParam, ApiBody,ApiConsumes } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { Query, UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {CreateMailDto} from "../mail/dto/create-mail.dto"
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        Tel: { type: 'string' },
        Adress: { type: 'string' },
        photo: {
          type: 'string',
          format: 'binary',
        },
        items: {type: 'string'}
      },
    },
  })

@ApiConsumes("multipart/form-data")
@UseInterceptors(
  FileInterceptor("photo", {
    storage: diskStorage({
      destination:"./upload",
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)
  @Post()
  async createUser(@Res() response, @Body() createUserDto:CreateUserDto, @UploadedFile() file: Express.Multer.File){
        try {
          createUserDto.photo=file.filename
           const newUser = await this.userService.create(createUserDto);
           console.log(newUser)
           return response.status(HttpStatus.CREATED).json({
             status:200,
          message:"user is created successfully",
            data: newUser,
          })
        } catch (error) {
          return response.status(HttpStatus.BAD_REQUEST).json({
            error
          })
        }
      }


  @Get()
  async getUser(@Res () response) {
    try {
      const list = await this.userService.findAll();
      console.log ("List of users: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "This is the list"
      })
      }
     catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error
      })
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type:String
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const list = await this.userService.findOne(id);
      console.log ("List of users: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "User Found"
      })
      }
     catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error
      })
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type:String
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Res() response) {
    console.log ("Update User: *********************",updateUserDto)
    try{
      const list = await this.userService.update(id,updateUserDto);
      console.log ("Update User:_____________________ ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "User Updated"
      })
    }
    catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
      message: error
    })
    }
  }
 
  @ApiParam({
    name:'id',
    description:'id to delete',
    required:true,
    type:String
  })
  @Delete(':id')
  async remove(@Param('id') id: string ,@Res() response) {
   try {
    await this.userService.remove(id)
    response.status(HttpStatus.ACCEPTED).json({
      message:"the user was removed successfully",
      status:200
    })
   } catch (error) {
    response.status(HttpStatus.BAD_REQUEST).json({
      message:"the user can not be removed",
      status:200
    })
   }
  }



  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        name: {type:'string'},
        email:{type:'string'}
      }
    }
  })
  @Post("mail")
  async signUp(@Body() req:CreateMailDto){
    const token = Math.floor(1000 + Math.random()*9000).toString();
    const user = {name:req.name, email:req.email}
    console.log("USER:",user)
    await this.userService.sendUserConfirmation(user,token);
    console.log("USER:TOKEN",token)
  }
@Get("items")
// @ApiParam({
//   name: 'items',
//   required: true,
//   description: 'texte text',
 
//   type:String
// })


async getItems(@Res () response,@Query('items') items: string) {
  try {
    console.log("1**",items)
    const list = await this.userService.findItems(items);
    console.log ("List of users: ",list)
    return response.status(HttpStatus.ACCEPTED).json({
      data:list,
      statut: 200,
      message: "This is the list"
    })
    }
   catch (error) {
    console.log("2**",items)
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: error
    })
  }
}
}
