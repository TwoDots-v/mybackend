import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
// import { CreateAuthDto } from './dto/create-login.dto';
// import { UpdateAuthDto } from './dto/update-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({schema:{
    properties:{
      'email':{type:'string'},
      'password':{type:'string'}
    }
  }})
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Request() req) {
    console.log(req);
    this.authService.logout(req.user['sub']);
  }
}
