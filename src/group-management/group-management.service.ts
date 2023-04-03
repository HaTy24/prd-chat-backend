import { Injectable } from '@nestjs/common';
import { AccountJoinGroupInput } from './dto/account-join-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupManagement } from './entities/group-management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupManagementService {
  constructor(
    @InjectRepository(GroupManagement)
    private groupManagementRepository: Repository<GroupManagement>,
  ) {}

  accountJoinGroup(accountJoinGroupInput: AccountJoinGroupInput) {
    return this.groupManagementRepository.save(accountJoinGroupInput);
  }
}
