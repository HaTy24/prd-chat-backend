import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatRoomService } from './chat-room.service';
import { Message } from './dto/chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { Request, UseGuards } from '@nestjs/common';
import { WsGuard } from 'src/packages/guards/ws.guard';
import { CurrentUser } from 'src/packages/decorators/user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { AppRequest } from 'src/packages/interface';

@WebSocketGateway({
  cors: '*',
})
export class ChatRoomGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @UseGuards(WsGuard)
  @SubscribeMessage('joinGroup')
  async joinGroup(@MessageBody() payload, @CurrentUser() user: Account) {
    console.log('user', user);

    await this.server.socketsJoin(payload.groupId);
    this.server.to(payload).emit('joinGroup', `Joined: ${payload}`);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('message')
  async createMessage(
    @MessageBody()
    payload: Message,
    @Request() req: AppRequest,
  ) {
    const messageCreated = await this.chatRoomService.createMessage(
      req.user.id,
      payload.groupId,
      payload.message,
    );

    this.server.to(payload.groupId).emit('messageCreated', messageCreated);
  }

  @SubscribeMessage('findAllMessage')
  findAll(@MessageBody() groupId) {
    return this.chatRoomService.findAll(groupId);
  }

  @SubscribeMessage('findOneChatRoom')
  findOne(@MessageBody() id: number) {
    return this.chatRoomService.findOne(id);
  }

  @SubscribeMessage('updateChatRoom')
  update(@MessageBody() updateChatRoomDto: UpdateChatRoomDto) {
    return this.chatRoomService.update(updateChatRoomDto.id, updateChatRoomDto);
  }

  @SubscribeMessage('removeChatRoom')
  remove(@MessageBody() id: number) {
    return this.chatRoomService.remove(id);
  }
}
