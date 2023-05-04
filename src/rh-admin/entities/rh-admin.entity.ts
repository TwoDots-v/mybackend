import { type } from "os";
import { User } from "../../user/entities/user.entity"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type RhAdmindocument=HydratedDocument<RhAdmin>
@Schema()
export class RhAdmin {
    @Prop()
    experience: string
}
export const RhAdminSchema = SchemaFactory.createForClass(RhAdmin)
