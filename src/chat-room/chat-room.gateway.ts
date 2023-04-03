import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { Socket } from 'dgram';

@WebSocketGateway({
  cors: '*',
})
export class ChatRoomGateway {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @SubscribeMessage('message')
  create(
    @MessageBody() createChatRoomDto: CreateChatRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log({ createChatRoomDto, client });

    // return this.chatRoomService.create(createChatRoomDto);
  }

  @SubscribeMessage('findAllChatRoom')
  findAll() {
    return this.chatRoomService.findAll();
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
