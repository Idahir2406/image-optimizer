import { Test, TestingModule } from '@nestjs/testing';
import { ImageOptimizerController } from './image-optimizer.controller';
import { ImageOptimizerService } from './image-optimizer.service';

describe('ImageOptimizerController', () => {
  let controller: ImageOptimizerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageOptimizerController],
      providers: [ImageOptimizerService],
    }).compile();

    controller = module.get<ImageOptimizerController>(ImageOptimizerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
