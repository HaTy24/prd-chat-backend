import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  providers: [ChatRoomGateway, ChatRoomService, ChatResolver, JwtService],
})
export class ChatRoomModule {}
