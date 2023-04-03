import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
