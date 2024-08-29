import SharpImageProcessor from './processor/sharp';
import MinioStorage from './storage/minio';
import ImageUploadService from './upload';

const processor = new SharpImageProcessor();
const storage = new MinioStorage();

export const imageUpload = new ImageUploadService(processor, storage);
