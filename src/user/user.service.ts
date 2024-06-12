import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserCreateDto } from './user.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private model: typeof User,
    private role: RoleService,
  ) {}
  async registerUser(dto: UserCreateDto) {
    const candidate = await this.model.findOne({ where: { email: dto.email } });
    if (candidate) {
      throw new HttpException(
        `${dto.email} уже зарегистрирован`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.model.create(dto);
    const role = await this.role.getUserRole();
    await user.$set('roles', [role.id]);
    return user;
  }
  async findByEmail(email: string) {
    return await this.model.findOne({ where: { email } });
  }

  async findAll() {
    return await this.model.findAll({ include: { all: true } });
  }
}
