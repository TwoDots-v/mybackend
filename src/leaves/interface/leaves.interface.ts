import { Document } from "mongoose";
export interface ILeave extends Document {
    readonly annual_leave:string;
    readonly sick_leave:string;
    readonly total_leave:string;
}