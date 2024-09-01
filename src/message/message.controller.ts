import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MessageDto } from './Dto/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(public messageService: MessageService) {}

  @Post('send/:id')
  sendMessage(
    @Body() body: MessageDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.messageService.sendMessage(body, id, req);
  }

  @Get('/:id')
  getMessages(@Req() req: Request, @Param('id') id: string) {
    return this.messageService.getMessages(id, req);
  }
}
