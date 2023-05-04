import { Module } from '@nestjs/common';
import { RhAdminService } from './rh-admin.service';
import { RhAdminController } from './rh-admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RhAdminSchema } from './entities/rh-admin.entity';
@Module({
  imports:[MongooseModule.forFeature([{schema:RhAdminSchema, name:'rh-admin'}])],
  controllers: [RhAdminController],
  providers: [RhAdminService]
})
export class RhAdminModule {}
