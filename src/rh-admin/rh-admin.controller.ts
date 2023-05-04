import { Controller, Get, Post, Body, Patch, Param, Delete,Res,UploadedFile } from '@nestjs/common';
import { RhAdminService } from './rh-admin.service';
import { CreateRhAdminDto } from './dto/create-rh-admin.dto';
import { UpdateRhAdminDto } from './dto/update-rh-admin.dto';
import { ApiTags, ApiParam, ApiBody,ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('rh-admin')
@ApiTags('rh-admin')
export class RhAdminController {
  constructor(private readonly rhAdminService: RhAdminService) {}

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
        experience:{ type : 'string'},
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
  async createHr(@Res() response, @Body() createRhAdminDto: CreateRhAdminDto,@UploadedFile() file: Express.Multer.File) {
    try {
      // createRhAdminDto.photo=file.filename
       const newUser = await this.rhAdminService.create(createRhAdminDto);
       console.log(newUser)
       return response.status(HttpStatus.CREATED).json({
         status:200,
      message:"HR is created successfully",
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
      const list = await this.rhAdminService.findAll();
      console.log ("The HR: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "This is the HR"
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
      const list = await this.rhAdminService.findOne(id);
      console.log ("List of HR: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "HR Found"
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
      //type: Number
      type:String
    })
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateRhAdminDto,@Res() response) {
      console.log ("Update User: *********************",updateUserDto)
      try{
        const list = await this.rhAdminService.update(id,updateUserDto);
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
    description:'id to delted',
    required:true,
    type:String
  })
  @Delete(':id')
  async remove(@Param('id') id: string ,@Res() response) {
   try {
    await this.rhAdminService.remove(id)
    response.status(HttpStatus.ACCEPTED).json({
      message:"the HR was removed successfully",
      status:200
    })
   } catch (error) {
    response.status(HttpStatus.BAD_REQUEST).json({
      message:"the HR can not be removed",
      status:200
    })
   }
  }
  }

