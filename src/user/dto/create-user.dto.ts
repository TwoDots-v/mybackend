import {IsNotEmpty, IsString, IsEmail } from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    name:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    password:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsEmail()  
    @IsString() 
    email:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    photo:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    Adress:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    Tel:string;
    
    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    ListOfLeaves:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    Task:string;

    @IsNotEmpty()  
    @IsString() 
    items:string;
    
    refreshToken:string;
}
