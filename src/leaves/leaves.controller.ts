import { Controller, Get, Post, Body, Patch, Param, Delete, Res,UseGuards  } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { CreateLeafDto } from './dto/create-leaf.dto';
import { UpdateLeafDto } from './dto/update-leaf.dto';
import { ApiTags, ApiParam, ApiBody,ApiBearerAuth } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { create } from 'domain';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';

@Controller('leaves')
@ApiTags('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        annual_leave: { type: 'string' },
        sick_leave: { type: 'string' },
        total_leave: { type: 'string' },
      },
    },
  })

  @Post()
  async createLeave(@Res() response, @Body() CreateLeafDto:CreateLeafDto){
    try {
       const newLeave = await this.leavesService.create(CreateLeafDto);
       console.log(newLeave)
       return response.status(HttpStatus.CREATED).json({
         status:200,
      message:"Leave is created successfully",
        data: newLeave,
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({error})
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get()
  async getLeave(@Res () response) {
    try {
      const list = await this.leavesService.findAll();
      console.log ("List of leaves: ",list)
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

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type:String
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const list = await this.leavesService.findOne(id);
      console.log ("List of leaves: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "Leave Found"
      })
      }
     catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error
      })
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard) 
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type:String
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateLeafDto:UpdateLeafDto,@Res() response) {
    try{
      const list = await this.leavesService.update(id,UpdateLeafDto);
      console.log ("Update Leave: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "Leave Updated"
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
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard) 
  @Delete(':id')
  async remove(@Param('id') id: string ,@Res() response) {
   try {
    await this.leavesService.remove(id)
    response.status(HttpStatus.ACCEPTED).json({
      message:"the leave was removed successfully",
      status:200
    })
   } catch (error) {
    response.status(HttpStatus.BAD_REQUEST).json({
      message:"the leave can not be removed",
      status:200
    })
   }
  }
}
