import type { ImageProcessOptions } from '../model/type';

const acceptedImageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

const imageProcessOptions: ImageProcessOptions = {
  maxWidth: 1000,
  format: 'jpeg',
  quality: 75,
};

const signedUrlExpires = 60 * 60 * 1000; // 1 hour

export { acceptedImageMimeTypes, signedUrlExpires, imageProcessOptions };
