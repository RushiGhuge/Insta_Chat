import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

export const userSocketMap = {};

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200'],
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected : ', socket?.id);
      const userId = socket.handshake.query.userId as string;
      if (userId.length > 0 && userId !== undefined) {
        userSocketMap[userId] = socket?.id;
        this.server.emit('getOnlineUsers', Object.keys(userSocketMap));
      }

      socket.on('disconnect', () => {
        console.log('Disconnected : ', socket?.id);
        delete userSocketMap[userId];
        console.log(userSocketMap);
        this.server.emit('getOnlineUsers', Object.keys(userSocketMap));
      });
    });
  }

  // socket ids are troring the socket id which needs to emmit...
  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any, socketIds: string[]) {
    console.log(body);
    socketIds.forEach((socketId) => {
      this.server.to(socketId).emit('message', {
        message: 'message',
        content: body,
      });
    });
    // this.server.emit('message', {
    //   message: 'message',
    //   content: body,
    // });
  }

  getRecieverSocketId(receiverId: string) {
    console.log(userSocketMap);
    return userSocketMap[receiverId];
  }
}
