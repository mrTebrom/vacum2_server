import { Role } from './role.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private model: typeof Role) {}
  async getUserRole() {
    return await this.model.findOne({ where: { value: 'USER' } });
  }
  async startPack() {
    await this.model.create({ value: 'USER', description: 'Пользователь' });
    await this.model.create({ value: 'ADMIN', description: 'Админ' });
  }
}
