import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.accountRepository.findOneBy({
      firstName: loginInput.firstName,
      lastName: loginInput.lastName,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
