import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  access_token: string;
}
