import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto, UserLoginDto } from './Dto/user.dto';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  @Post('register')
  newUserRegistration(@Body() body: UserDto) {
    return body;
  }

  @Post('login')
  login(@Body() body: UserLoginDto) {
    return body;
  }
}
