import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from 'src/user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from './local.strategy';
import { AccessTokenStrategy } from './jwt.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LeavesModule } from 'src/leaves/leaves.module';
import { LeavesService } from 'src/leaves/leaves.service';
import { LeaveSchema } from 'src/leaves/entities/leaf.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { TasksModule } from 'src/tasks/tasks.module'; 
import { TaskSchema } from 'src/tasks/entities/task.entity';
import { ProjectSchema } from 'src/projects/entities/project.entity';


@Module({
  imports: [TasksModule,LeavesModule,UserModule, PassportModule, JwtModule.register({
    secret: 'pfe',
    signOptions: { expiresIn: '60s' },
  }),
  MongooseModule.forFeature([{schema:UserSchema, name:'user'}]),
  MongooseModule.forFeature([{schema:LeaveSchema, name:'leaves'}]),
  MongooseModule.forFeature([{schema:TaskSchema, name:'tasks'}]),
  MongooseModule.forFeature([{schema:ProjectSchema, name:'projects'}]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '15m' },
  }),],
  controllers: [AuthController],
  providers: [TasksService,LeavesService,AuthService,LocalStrategy,AccessTokenStrategy,RefreshTokenStrategy,UserService]
})
export class AuthModule {}
