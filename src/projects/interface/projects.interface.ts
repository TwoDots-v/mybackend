import { Document } from "mongoose";
export interface IProject extends Document {
    readonly name:string;
    readonly description:string;
    readonly deadline:Date;
    readonly ListOfTasks: string;
}