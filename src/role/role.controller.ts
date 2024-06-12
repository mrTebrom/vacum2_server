import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private service: RoleService) {}
  @Get('/')
  startPack() {
    return this.service.startPack();
  }
}
