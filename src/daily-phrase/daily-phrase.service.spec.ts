import { Test, TestingModule } from '@nestjs/testing';
import { DailyPhraseService } from './daily-phrase.service';

describe('DailyPhraseService', () => {
  let service: DailyPhraseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyPhraseService],
    }).compile();

    service = module.get<DailyPhraseService>(DailyPhraseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
