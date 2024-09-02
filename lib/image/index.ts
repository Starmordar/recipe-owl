import SharpImageProcessor from './processor/sharp';
import GoogleCloudeStorage from './storage/google-cloud';
import ImageUploadService from './upload';

const processor = new SharpImageProcessor();
const storage = new GoogleCloudeStorage();

export const imageUpload = new ImageUploadService(processor, storage);
