import { Document } from "mongoose";
export interface IUser extends Document {
    readonly name:string;
    readonly password:string;
    readonly email:string;
    readonly photo:string;
    readonly Adress:string;
    readonly Tel:string;
    readonly ListOfLeaves:string;
    readonly Task:string;
    refreshToken:string;
    readonly items:string;
}