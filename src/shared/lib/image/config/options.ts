import type { ImageProcessOptions } from '../model/type';

const imageProcessOptions: ImageProcessOptions = {
  maxWidth: 1000,
  format: 'jpeg',
  quality: 75,
};

const signedUrlExpires = 60 * 60 * 1000; // 1 hour

export { signedUrlExpires, imageProcessOptions };
