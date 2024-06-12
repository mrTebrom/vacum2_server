import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Get('/')
  findAll(): Promise<User[]> {
    console.log('a');
    return this.service.findAll();
  }
}
