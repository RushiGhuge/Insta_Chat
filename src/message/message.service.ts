import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageDto } from './Dto/message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private MessageModel: Model<MessageDto>,
    @InjectModel('Conversation') private ConversationModel: Model<any>,
  ) {}

  async sendMessage(body: MessageDto, receiverId: string, req: Request) {
    try {
      const { message } = body;
      const user = req['user'];
      const senderId = user._id;

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
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
      await Promise.all([conversation.save(), newMessage.save()]);
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
    if (!conversation) return [];
    return conversation.messages;
  }
}
