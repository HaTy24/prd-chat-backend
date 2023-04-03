import { Module } from '@nestjs/common';
import { GroupManagementService } from './group-management.service';
import { GroupManagementResolver } from './group-management.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupManagement } from './entities/group-management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupManagement])],
  providers: [GroupManagementResolver, GroupManagementService],
})
export class GroupManagementModule {}
