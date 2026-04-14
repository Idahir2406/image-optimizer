import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageOptimizerModule } from './image-optimizer/image-optimizer.module';

@Module({
  imports: [ImageOptimizerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
