import { Controller, Get, Post, Body, Patch, Param, Delete, Res,UseGuards } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiParam, ApiBody,ApiBearerAuth } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectService) {}
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        deadline:{type: 'Date'},
        ListOfTasks: { type: 'string' },
      },
    },
  })


  @Post()
  async createProject(@Res() response, @Body() CreateProjectDto:CreateProjectDto){
        try {
           const newProject = await this.projectsService.create(CreateProjectDto);
           console.log(newProject)
           return response.status(HttpStatus.CREATED).json({
             status:200,
          message:"Project is created successfully",
            data: newProject,
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
  async getProject(@Res () response) {
    try {
      const list = await this.projectsService.findAll();
      console.log ("List of projects: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "List of projects"
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
      const list = await this.projectsService.findOne(id);
      console.log ("Project: ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "Project Found"
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
  async update(@Param('id') id: string, @Body() UpdateProjectDto: UpdateProjectDto,@Res() response) {
    console.log ("Update Project: *********************",UpdateProjectDto)
    try{
      const list = await this.projectsService.update(id,UpdateProjectDto);
      console.log ("Update Project:_____________________ ",list)
      return response.status(HttpStatus.ACCEPTED).json({
        data:list,
        statut: 200,
        message: "Project Updated"
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
    await this.projectsService.remove(id)
    response.status(HttpStatus.ACCEPTED).json({
      message:"the project was removed successfully",
      status:200
    })
   } catch (error) {
    response.status(HttpStatus.BAD_REQUEST).json({
      message:"the project can not be removed",
      status:200
    })
   }
  }
}
