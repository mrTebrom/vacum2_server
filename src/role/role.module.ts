import { User } from './../user/user.model';
import { Role } from './role.model';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService, SequelizeModule],
})
export class RoleModule {}
