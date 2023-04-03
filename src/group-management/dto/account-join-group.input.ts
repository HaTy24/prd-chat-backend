import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AccountJoinGroupInput {
  @Field(() => String)
  accountId: string;

  @Field(() => String)
  groupId: string;

  @Field(() => Boolean)
  isAdmin: boolean;
}
