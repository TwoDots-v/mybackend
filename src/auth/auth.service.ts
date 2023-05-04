import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service"
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { NotAcceptableException } from '@nestjs/common/exceptions';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {
    }
    async login(user: any){
        const refreshToken = this.jwtService.sign(
            {
                sub: user._id,
                email: user.email,
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            },
        )
        await this.updateRefreshToken(user._id, refreshToken);
        return {
            access_token: this.jwtService.sign(
                {
                    sub: user._id,
                    email: user.email,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },  
            ),
            refreshToken: refreshToken
        };
    }
    async updateRefreshToken(userId: string, refreshToken: string){
        const hashedRefreshToken = await this.hashData(refreshToken);
        //Fonction Update fel user
        await this.userService.update2(userId,{
            refreshToken: hashedRefreshToken,
        });
    }
    hashData(data: string){
        return argon2.hash(data);
    }
    async validateUser(email: string, password: string): Promise<any>{
        console.log('************',email);
        const user = await this.userService.getUserByEmail(email);
        if (!user) return null;
        const passwordValid = await argon2.verify(user.password,password)
        if (!user) {
            throw new NotAcceptableException('Could not find the user');
        }
        if(user && passwordValid){
            return user;
        }
        return null;
    }
    logout(userId:string){
        console.log("userId is:",userId)
        const refreshtoken=null;
        console.log("test",refreshtoken)
        return this.userService.update2(userId,refreshtoken)
      }

      

//   create(createLoginDto: CreateLoginDto) {
//     return 'This action adds a new auth';
//   }

//   findAll() {
//     return `This action returns all auth`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} auth`;
//   }

//   update(id: number, updateAuthDto: UpdateAuthDto) {
//     return `This action updates a #${id} auth`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} auth`;
//   }
}
