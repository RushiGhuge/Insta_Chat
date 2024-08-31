import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto, UserLoginDto } from './Dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('register')
  newUserRegistration(@Body() body: UserDto) {
    return this.authService.createNewUser(body);
  }

  @Post('login')
  login(@Body() body: UserLoginDto) {
    return this.authService.loginUser(body);
  }
}
