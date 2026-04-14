import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import sharp from 'sharp';
import {
  WEBP_ALPHA_QUALITY,
  WEBP_EFFORT,
  WEBP_QUALITY,
} from './constants';
import type { OptimizedImageResult } from './types/optimize-image-result';

@Injectable()
export class ImageOptimizerService {

  private logger = new Logger(ImageOptimizerService.name)

  async optimizeImages(
    files: Express.Multer.File[],
  ): Promise<OptimizedImageResult[]> {
    return Promise.all(files.map((file) => this.optimizeOne(file)));
  }

  private async optimizeOne(
    file: Express.Multer.File,
  ): Promise<OptimizedImageResult> {
    const input = file.buffer;
    if (!input?.length) {
      throw new BadRequestException(
        `"${file.originalname}" no tiene contenido legible.`,
      );
    }

    const baseName = path.parse(file.originalname).name || 'image';
    const filename = `${sanitizeFilename(baseName)}.webp`;

    try {
      const pipeline = sharp(input, { failOn: 'error', animated: true })
        .rotate()
        .webp({
          quality: WEBP_QUALITY,
          effort: WEBP_EFFORT,
          smartSubsample: true,
          alphaQuality: WEBP_ALPHA_QUALITY,
        });

      const webpBuffer = await pipeline.toBuffer();
      this.logger.debug("Imagen optimizada: ", file.originalname, new Date())
      return {
        originalName: file.originalname,
        filename,
        mimeType: 'image/webp',
        size: webpBuffer.length,
        dataBase64: webpBuffer.toString('base64'),
      };
    } catch {
      throw new BadRequestException(
        `No se pudo procesar "${file.originalname}". Asegúrate de que sea una imagen válida.`,
      );
    }
  }
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w.-]+/g, '_').slice(0, 200) || 'image';
}
