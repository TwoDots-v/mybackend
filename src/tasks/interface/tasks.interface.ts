import { Document } from "mongoose";
export interface ITask extends Document {
    readonly name:string;
    readonly description:string;
    readonly location:string;
    readonly shift:string;
    readonly IdProject:string;
}