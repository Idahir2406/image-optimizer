import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImageOptimizerService } from './image-optimizer.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MAX_FILES_PER_REQUEST, MAX_IMAGE_FILE_BYTES } from './constants';
import { memoryStorage } from 'multer';
import { ImageFilesValidationPipe } from './pipes/image-files-validation.pipe';

@Controller('image-optimizer')
export class ImageOptimizerController {
  constructor(private readonly imageOptimizerService: ImageOptimizerService) {}

  
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES_PER_REQUEST, {
      storage: memoryStorage(),
      limits: { fileSize: MAX_IMAGE_FILE_BYTES },
    }),
  )
  optimizeImages(
    @UploadedFiles(new ImageFilesValidationPipe())
    files: Express.Multer.File[],
  ) {
    return this.imageOptimizerService.optimizeImages(files);
  }
}
