import { Test, TestingModule } from '@nestjs/testing';
import { GroupManagementService } from './group-management.service';

describe('GroupManagementService', () => {
  let service: GroupManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupManagementService],
    }).compile();

    service = module.get<GroupManagementService>(GroupManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
