import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageDto } from './Dto/message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketGateway } from '../gateway/socket.gateway';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';

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
      console.warn(
        '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4' +
          ' ' +
          user._id +
          '  ' +
          message,
      );

      let conversation = await this.ConversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (!conversation) {
        conversation = await this.ConversationModel.create({
          participants: [senderId, receiverId],
        });
      }
      const newMessage = new this.MessageModel({
        senderId,
        receiverId,
        message,
        conversationId: conversation._id,
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
      await Promise.all([conversation.save(), newMessage.save()]);
      console.log('calling from frontend');

      // SocketgIO connection emits the message
      // const receiverSocketID = this.getway.getRecieverSocketId(receiverId);
      // const senderSocketID = this.getway.getRecieverSocketId(senderId);

      if (receiverId) {
        console.error('receiverSocketID ^^^^^^^^^^^^^^^^^^^^^', receiverId);
        // this.getway.handleMessage(newMessage, [receiverSocketID]);
        this.httpService
          .post('http://localhost:3000/send_msg_event', {
            body: newMessage,
            receiverId,
          })
          .subscribe((s) => console.log(s));
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
