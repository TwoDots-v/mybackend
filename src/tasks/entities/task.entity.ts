import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
@Schema()
export class Tasks{
    @Prop()
    name:string
    @Prop()
    description:string
    @Prop()
    location:string
    @Prop()
    shift:string
    @Prop({type:SchemaTypes.ObjectId, ref:'project'})
    IdProject:Types.ObjectId;
}
export const TaskSchema = SchemaFactory.createForClass(Tasks)
