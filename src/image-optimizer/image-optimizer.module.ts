import { Module } from '@nestjs/common';
import { ImageOptimizerService } from './image-optimizer.service';
import { ImageOptimizerController } from './image-optimizer.controller';

@Module({
  controllers: [ImageOptimizerController],
  providers: [ImageOptimizerService],
})
export class ImageOptimizerModule {}
