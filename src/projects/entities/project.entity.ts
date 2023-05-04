import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
@Schema()
export class Project {
    @Prop()
    name:string
    @Prop()
    description:string
    @Prop()
    deadline:Date
    @Prop([{type:SchemaTypes.ObjectId, ref:'tasks'}])
    ListOfTasks:Types.ObjectId;
}
export const ProjectSchema = SchemaFactory.createForClass(Project)
