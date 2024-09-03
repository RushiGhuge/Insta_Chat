import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/Schema/message.schema';
import { ConversationSchema } from 'src/Schema/conversation.schema';
import { SocketGateway } from 'src/gateway/socket.gateway';

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
