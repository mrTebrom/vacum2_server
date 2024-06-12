import { User } from './../user/user.model';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/user/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';

interface AuthenticatedRequest extends Request {
  user: User; // Здесь 'any' может быть заменено на тип пользователя в зависимости от вашей логики
}

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('register')
  register(@Body() dto: UserCreateDto) {
    console.log(dto);
    return this.service.register(dto);
  }
  @Post('login')
  loging(@Body() dto: UserCreateDto) {
    return this.service.login(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Req() req: AuthenticatedRequest) {
    return this.service.refresh(req.user);
  }
}
