import sharp from 'sharp';
import { acceptedImageMimeTypes } from '../constants';
import type { ImageProcessOptions, ImageProcessor } from './type';

export class SharpImageProcessor implements ImageProcessor {
  async process(buffer: Buffer, options: ImageProcessOptions): Promise<Buffer> {
    console.log('options :>> ', options);
    const image = sharp(buffer);

    const metadata = await image.metadata();
    console.log('before resize :>> ', metadata);

    const metadata2 = await image.resize(options.maxWidth).metadata();
    console.log('after resize :>> ', metadata2);

    // const metadata3 = await image
    //   .resize(options.maxWidth)
    //   .toFormat(options.format, { quality: options.quality })
    //   .metadata();
    // console.log('after format change :>> ', metadata3);

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
