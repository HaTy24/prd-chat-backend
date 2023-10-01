import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountInput: CreateAccountInput) {
    const account = await this.accountRepository.save(createAccountInput);
    return account;
  }

  findAll() {
    return this.accountRepository.find();
  }

  findByID(id: string) {
    return this.accountRepository.findOneBy({ id });
  }
}
