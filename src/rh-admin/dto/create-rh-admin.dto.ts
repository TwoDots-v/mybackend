import { CreateUserDto } from "src/user/dto/create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString, IsEmail } from '@nestjs/class-validator';;
export class CreateRhAdminDto {

    experience:string;
    items:string;
}
