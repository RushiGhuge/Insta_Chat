import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto, UserLoginDto } from './Dto/user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('register')
  newUserRegistration(
    @Body() body: UserDto,
    @Res({ passthrough: true }) responce: Response,
  ) {
    return this.authService.createNewUser(body, responce);
  }

  @Post('login')
  login(
    @Body() body: UserLoginDto,
    @Res({ passthrough: true }) responce: Response,
  ) {
    return this.authService.loginUser(body, responce);
  }
}
