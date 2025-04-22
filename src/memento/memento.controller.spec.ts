import { Test, TestingModule } from '@nestjs/testing';
import { MementoController } from './memento.controller';

describe('MementoController', () => {
  let controller: MementoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MementoController],
    }).compile();

    controller = module.get<MementoController>(MementoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
