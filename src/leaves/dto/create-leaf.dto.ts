import {IsNotEmpty, IsString, IsEmail } from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateLeafDto {
    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()
    @IsString()
    annual_leave:string;
    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()
    @IsString()
    sick_leave:string;
    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()
    @IsString()
    total_leave:string;
}

