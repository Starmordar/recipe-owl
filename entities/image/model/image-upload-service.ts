import { SharpImageProcessor } from '../lib/processor/sharp';
import { GoogleCloudeStorage } from '../lib/storage/google-cloud';
import { ImageUploadService } from '../lib/upload';

const processor = new SharpImageProcessor();
const storage = new GoogleCloudeStorage();

const imageUploadService = new ImageUploadService(processor, storage);

export { imageUploadService };
