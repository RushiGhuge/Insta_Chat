import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(@Req() request: Request) {
    return this.userService.fetchUsers(request);
  }
}
