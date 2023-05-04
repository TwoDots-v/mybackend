import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { AccessTokenGuard } from '../auth/common/guards/accessToken.guard';

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth('access-token')
 @UseGuards(AccessTokenGuard) 
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Res() response, @Body() CreateTaskDto:CreateTaskDto){
    try {
       const newTask = await this.tasksService.create(CreateTaskDto);
       console.log(newTask)
       return response.status(HttpStatus.CREATED).json({
         status:200,
        message:"Task is created successfully",
        data: newTask,
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error
      })
    }
  }

@ApiBearerAuth('access-token')
 @UseGuards(AccessTokenGuard)
  @Get()
  async getTask(@Res () response) {
    try {
      const list = await this.tasksService.findAll();
      console.log ("List of tasks: ",list)
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
      const list = await this.tasksService.findOne(id);
      console.log ("List of tasks: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "Task Found"
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
  async update(@Param('id') id: string, @Body() UpdateTaskDto: UpdateTaskDto,@Res() response) {
    console.log ("Update Task: *********************",UpdateTaskDto)
    try{
      const list = await this.tasksService.update(id,UpdateTaskDto);
      console.log ("Update Task:_____________________ ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "Task Updated"
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
     await this.tasksService.remove(id)
     response.status(HttpStatus.ACCEPTED).json({
       message:"the task was removed successfully",
       status:200
     })
    } catch (error) {
     response.status(HttpStatus.BAD_REQUEST).json({
       message:"the task can not be removed",
       status:200
     })
    }
   }
}
