import { ImageProcessOptions } from '../processor/type';

export const acceptedImageMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

export const imageProcessOptions: ImageProcessOptions = {
  maxWidth: 1000,
  format: 'webp',
  quality: 75,
};
