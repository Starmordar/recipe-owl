import { imageProcessOptions } from '../../config/options';

import type { ImageProcessor, ImageStorage } from '../../model/type';

class ImageUploadService {
  private readonly processor: ImageProcessor;
  private readonly storage: ImageStorage;

  constructor(processor: ImageProcessor, storage: ImageStorage) {
    this.processor = processor;
    this.storage = storage;
  }

  async upload(file: File): Promise<string> {
    let processed = false;
    let buffer = Buffer.from(await file.arrayBuffer());

    if (this.processor.supported(file.type)) {
      processed = true;
      buffer = await this.processor.process(buffer, imageProcessOptions);
    }

    const extension = processed ? imageProcessOptions.format : undefined;
    return this.storage.upload(this.getFileName(file.name, extension), buffer);
  }

  getFileName(original: string, extension: string | undefined): string {
    const [oFilename, oExtension] = original.split('.');
    return `${oFilename}.${extension ?? oExtension}`;
  }
}

export { ImageUploadService };
