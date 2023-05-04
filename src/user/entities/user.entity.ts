import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import * as argon2 from 'argon2';
import { RhAdmin } from "src/rh-admin/entities/rh-admin.entity";
import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema({ discriminatorKey: 'items' })
export class User{
    @Prop({type: String, required: true,enum:[RhAdmin.name,User.name]})
    items:string
    @Prop()
    name:string
    @Prop()
    email:string
    @Prop()
    password:string
    @Prop()
    photo:string
    @Prop()
    Tel:string
    @Prop()
    Adress:string
    @Prop({type:SchemaTypes.ObjectId, ref:'leaves'})
    ListOfLeaves:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId, ref:'tasks'})
    Task:Types.ObjectId;
    @Prop()
    refreshToken:string
}
//export const UserSchema = SchemaFactory.createForClass(User)
export const UserSchema = SchemaFactory.createForClass(User).pre("save",async function(){
    this.password = await argon2.hash(this.password);
})
