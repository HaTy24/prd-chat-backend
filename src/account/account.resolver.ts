import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './entities/account.entity';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountService.create(createAccountInput);
  }

  @Query(() => [Account], { name: 'account' })
  findAll() {
    return this.accountService.findAll();
  }
}
