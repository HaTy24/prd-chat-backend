import { Injectable } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(createGroupInput: CreateGroupInput) {
    const group = await this.groupRepository.save(createGroupInput);
    return group;
  }

  findAll() {
    return this.groupRepository.find();
  }
}
