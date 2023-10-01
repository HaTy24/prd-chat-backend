import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChatRoomService } from './chat-room.service';
import { ChatRoom } from './entities/chat-room.entity';
import { GqlAuthGuard } from 'src/packages/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/packages/decorators/user.decorator';
import { Account } from 'src/account/entities/account.entity';

@Resolver(() => ChatRoom)
export class ChatResolver {
  constructor(private readonly groupService: ChatRoomService) {}

  @Query(() => ChatRoom, { name: 'chat' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('groupId', { type: () => String }) groupId: string,
    @CurrentUser() user: Account,
  ) {
    return this.groupService.findAll(groupId);
  }
}
