import { Test, TestingModule } from '@nestjs/testing';
import { GroupManagementResolver } from './group-management.resolver';
import { GroupManagementService } from './group-management.service';

describe('GroupManagementResolver', () => {
  let resolver: GroupManagementResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupManagementResolver, GroupManagementService],
    }).compile();

    resolver = module.get<GroupManagementResolver>(GroupManagementResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
