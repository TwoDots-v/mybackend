import {IsNotEmpty, IsString} from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class CreateTaskDto {
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
    description:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    location:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    shift:string;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    IdProject:string;
}
