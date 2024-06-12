// auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Добавьте свою логику проверки авторизации здесь, если это необходимо
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Вы можете добавить дополнительную логику обработки здесь, например, для обработки ошибок
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
