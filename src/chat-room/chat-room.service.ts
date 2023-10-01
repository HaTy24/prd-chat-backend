import { Injectable } from '@nestjs/common';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { Repository } from 'typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
  ) {}
  createMessage(clientId: string, groupId: string, message: string) {
    const messageCreated = ChatRoom.from({
      senderId: clientId,
      groupId,
      message,
    });

    return this.chatRoomRepository.save(messageCreated);
  }

  findAll(groupId: string) {
    return this.chatRoomRepository.findOneBy({ groupId });
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
