import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageDto } from './Dto/message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketGateway } from '../gateway/socket.gateway';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';
import { CHAT_BACKEND_URL } from '../../src/constants/constants';
// import { UserService } from 'src/user/user.service'

@Injectable()
export class MessageService {
  @WebSocketServer()
  server: Server;
  constructor(
    @InjectModel('Message') private MessageModel: Model<MessageDto>,
    @InjectModel('Conversation') private ConversationModel: Model<any>,
    public httpService: HttpService,
    private getway: SocketGateway,
  ) {}

  async sendMessage(body: MessageDto, receiverId: string, req: Request) {
    try {
      const { message } = body;
      const user = req['user'];
      const senderId = user._id;
      console.log(user);
      let conversation = await this.ConversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (!conversation) {
        conversation = await this.ConversationModel.create({
          participants: [senderId, receiverId],
        });
      }
      // this.userService.getUserById(senderId);
      const newMessage = new this.MessageModel({
        senderId,
        receiverId,
        message,
        conversationId: conversation._id,
        senderName: user?.name,
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      } else {
        console.log('hi');
      }
      await Promise.all([conversation.save(), newMessage.save()]);
      console.log(newMessage);

      if (receiverId) {
        console.error('receiverSocketID ^^^^^^^^^^^^^^^^^^^^^', receiverId);
        // this.getway.handleMessage(newMessage, [receiverSocketID]);
        this.httpService
          .post(`${CHAT_BACKEND_URL}/send_msg_event`, {
            body: newMessage,
            receiverId,
          })
          .subscribe();
      }
      return newMessage;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getMessages(receiverId: string, req: Request) {
    const user = req['user'];
    const senderId = user._id;
    const conversation = await this.ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages');
    if (!conversation) return null;
    return conversation;
  }
}
