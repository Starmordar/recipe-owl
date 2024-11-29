import type { ImageProcessOptions } from '../model/type';

const imageProcessOptions: ImageProcessOptions = {
  maxWidth: 750,
  format: 'webp',
  quality: 70,
};

const signedUrlExpires = 60 * 60 * 1000; // 1 hour

export { signedUrlExpires, imageProcessOptions };
