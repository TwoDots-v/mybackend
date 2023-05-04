import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class Leaf {
    @Prop()
    annual_leave:string
    @Prop()
    sick_leave:string
    @Prop()
    total_leave:string
}
export const LeaveSchema = SchemaFactory.createForClass(Leaf)