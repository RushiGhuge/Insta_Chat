import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../Schema/message.schema';
import { ConversationSchema } from '../Schema/conversation.schema';
import { SocketGateway } from '../gateway/socket.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, SocketGateway],
  exports: [SocketGateway],
})
export class MessageModule {}
