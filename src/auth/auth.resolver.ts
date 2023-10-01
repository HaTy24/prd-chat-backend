import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Account } from 'src/account/entities/account.entity';
import { LoginInput, LoginResponse } from './dto/login.input';
import { AuthService } from './auth.service';

@Resolver(() => Account)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
