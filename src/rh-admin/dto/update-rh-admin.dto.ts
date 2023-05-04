import { PartialType } from '@nestjs/swagger';
import { CreateRhAdminDto } from './create-rh-admin.dto';

export class UpdateRhAdminDto extends PartialType(CreateRhAdminDto) {}
