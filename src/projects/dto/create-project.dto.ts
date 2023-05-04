import { IsNotEmpty, IsString, IsDate } from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
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
    @IsDate()  
    deadline:Date;

    @ApiProperty({
        type:String,
        description:'required property'
    })
    @IsNotEmpty()  
    @IsString() 
    ListOfTasks:string[];
}
