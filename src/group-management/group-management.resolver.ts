import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountJoinGroupInput } from './dto/account-join-group.input';
import { GroupManagement } from './entities/group-management.entity';
import { GroupManagementService } from './group-management.service';

@Resolver(() => GroupManagement)
export class GroupManagementResolver {
  constructor(
    private readonly groupManagementService: GroupManagementService,
  ) {}

  @Mutation(() => GroupManagement)
  accountJoinGroup(
    @Args('accountJoinGroupInput') accountJoinGroupInput: AccountJoinGroupInput,
  ) {
    return this.groupManagementService.accountJoinGroup(accountJoinGroupInput);
  }
}
