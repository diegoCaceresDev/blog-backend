import { Test, TestingModule } from '@nestjs/testing';
import { DailyPhraseController } from './daily-phrase.controller';

describe('DailyPhraseController', () => {
  let controller: DailyPhraseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyPhraseController],
    }).compile();

    controller = module.get<DailyPhraseController>(DailyPhraseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
