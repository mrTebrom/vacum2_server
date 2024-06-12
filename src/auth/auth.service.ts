import { Role } from './../role/role.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwt: JwtService,
  ) {}
  async register(dto: UserCreateDto) {
    const user = await this.user.registerUser(dto);

    const payload = this.jwt.sign({ username: user.email, sub: user.id });
    return payload;
  }
  async login(dto: UserCreateDto) {
    const user = await this.user.findByEmail(dto.email);
    if (!user) {
      throw new HttpException(
        'Почта или пороль не верны',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.password !== dto.password) {
      throw new HttpException(
        'Почта или пороль не верны',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = this.jwt.sign({ username: user.email, sub: user.id });
    return payload;
  }
  async refresh(user: any) {
    const token = await this.jwt.sign({ username: user.email, sub: user.id });
    const role = user.roles.map((item: Role) => ({
      value: item.value,
      description: item.description,
      id: item.id,
    }));
    return {
      token,
      user: { email: user.email, id: user.id, role: role },
    };
  }
}
