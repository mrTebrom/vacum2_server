// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Создайте интерфейс JwtPayload
import { User } from '../user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS, // Замените на ваш секретный ключ
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    // В этом методе вы можете добавить проверку, например, наличие пользователя в базе данных
    // Возвращайте пользователя, если он найден, или бросайте UnauthorizedException
    // Например:
    const user = await User.findByPk(payload.sub, { include: { all: true } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;

    return { userId: payload.sub, username: payload.username };
  }
}
