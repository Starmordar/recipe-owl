import sharp from 'sharp';

import { acceptedImageMimeTypes } from '../constants';

import type { ImageProcessOptions, ImageProcessor } from './type';

class SharpImageProcessor implements ImageProcessor {
  async process(buffer: Buffer, options: ImageProcessOptions): Promise<Buffer> {
    const image = sharp(buffer);

    const outBuffer = await image
      .resize(options.maxWidth)
      .toFormat(options.format, { quality: options.quality })
      .toBuffer();

    return outBuffer;
  }

  supported(mimeType: string): boolean {
    return acceptedImageMimeTypes.includes(mimeType);
  }
}

export default SharpImageProcessor;
