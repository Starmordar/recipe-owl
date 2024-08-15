import { Inject, Injectable } from '@nestjs/common';
import { imageProcessOptions } from './constants';

import type { ImageProcessor } from './processor/type';
import type { Storage } from '@app/storage/types';

@Injectable()
export class ImageService {
  constructor(
    @Inject('image-processor') private readonly processor: ImageProcessor,
    @Inject('image-storage') private readonly storage: Storage,
  ) {}

  async upload(file: Express.Multer.File): Promise<string> {
    let processed = false;
    let buffer = file.buffer;

    if (this.processor.supported(file.mimetype)) {
      processed = true;
      buffer = await this.processor.process(buffer, imageProcessOptions);
    }

    const extension = processed ? imageProcessOptions.format : undefined;

    return this.storage.upload(
      this.getFileName(file.originalname, extension),
      buffer,
    );
  }

  getFileName(original: string, extension: string | undefined): string {
    const [oFilename, oExtension] = original.split('.');
    return `${oFilename}.${extension ?? oExtension}`;
  }
}
