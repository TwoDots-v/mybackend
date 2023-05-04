// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { MailService } from '../mail/mail.service';
// import { CreateMailDto } from './dto/create-mail.dto';
// import { UpdateMailDto } from './dto/update-mail.dto';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { UserService } from 'src/user/user.service';
// import { AppService } from 'src/app.service';

// @Controller('mail')
// @ApiTags('mail')
// export class MailController {
//   constructor(private readonly mailService: MailService, private readonly userService:UserService, private readonly appService:AppService) {}

//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties:{
//         name: {type:'string'},
//         email:{type:'string'}
//       }
//     }
//   })
//   @Post("mail")
//   async signUp(@Body() req:CreateMailDto){
//     const token = Math.floor(1000 + Math.random()*9000).toString();
//     const user = {name:req.name, email:req.email}
//     console.log("USER:",user)
//     await this.appService.sendUserConfirmation(user,token);
//     console.log("USER:TOKEN",token)
//   }



//   // @Get()
//   // findAll() {
//   //   return this.mailService.findAll();
//   // }

//   // @Get(':id')
//   // findOne(@Param('id') id: string) {
//   //   return this.mailService.findOne(+id);
//   // }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
//   //   return this.mailService.update(+id, updateMailDto);
//   // }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.mailService.remove(+id);
//   // }
// }
