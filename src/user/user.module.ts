import { Role } from '../role/role.model';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserRole } from '../role/user-role.model';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [SequelizeModule.forFeature([User, UserRole, Role]), RoleModule], // Добавьте UserRole и Role
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, SequelizeModule], // Экспортируйте UserRole и Role
})
export class UserModule {}
