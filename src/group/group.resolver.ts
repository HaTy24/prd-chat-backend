import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGroupInput } from './dto/create-group.input';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput);
  }

  @Query(() => [Group], { name: 'group' })
  findAll() {
    return this.groupService.findAll();
  }
}
