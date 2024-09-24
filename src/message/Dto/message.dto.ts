import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  message: string;

  // @IsNotEmpty()
  // senderName: string;

  // @IsNotEmpty()
  // senderId: string;
  // @IsNotEmpty()
  // receiverId: string;
  // @IsNotEmpty()
  // conversationId: string;
}
