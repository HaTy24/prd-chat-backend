import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRoomService } from './chat-room.service';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';

@WebSocketGateway({
  cors: '*',
})
export class ChatRoomGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @SubscribeMessage('joinGroup')
  async joinGroup(@MessageBody() payload, @ConnectedSocket() client: Socket) {
    await this.server.socketsJoin(payload.groupId);
    this.server.to(payload).emit('haha', `this is message of ${payload}`);
  }

  @SubscribeMessage('message')
  async createMessage(
    @MessageBody() payload: { groupId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const messageCreated = await this.chatRoomService.create(
      client.id,
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
