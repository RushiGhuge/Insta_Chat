import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  message: string;
}
