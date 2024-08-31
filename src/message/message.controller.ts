import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { MessageDto } from './Dto/message.dto';

@Controller('message')
export class MessageController {
  @Post('send/:id')
  sendMessage(
    @Body() body: MessageDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      // const { message } = body;
      const user = req['user'];
      console.log(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return { body, id };
  }
}
