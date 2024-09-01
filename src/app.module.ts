import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { GatewayModule } from './gateway/gateway.module';
import { SocketGateway } from './gateway/socket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    AuthModule,
    MessageModule,
    UserModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
