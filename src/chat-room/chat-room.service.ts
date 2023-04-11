import { Injectable } from '@nestjs/common';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';

@Injectable()
export class ChatRoomService {
  private message = {};
  create(clientId: string, groupId: string, message: string) {
    this.message[groupId]
      ? this.message[groupId].push({ clientId, message })
      : (this.message[groupId] = [{ clientId, message }]);
    return { clientId, message };
  }

  findAll(groupId: string) {
    return this.message[groupId];
  }

  findOne(id: number) {
    return `This action returns a #${id} chatRoom`;
  }

  update(id: number, updateChatRoomDto: UpdateChatRoomDto) {
    return `This action updates a #${id} chatRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatRoom`;
  }
}
