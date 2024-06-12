import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
require('dotenv').config();
console.log(process.env.ACCESS);
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS, // Замените на ваш секретный ключ
      signOptions: { expiresIn: '15d' }, // Настройте срок действия токена
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule { }
