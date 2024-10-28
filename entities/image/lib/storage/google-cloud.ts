import { GetSignedUrlConfig, Storage as GoogleStorageClient } from '@google-cloud/storage';

import { signedUrlExpires } from '../../config/options';

import type { ImageStorage } from '../../model/type';

class GoogleCloudeStorage implements ImageStorage {
  private storageClient: GoogleStorageClient;
  private bucketName: string;

  constructor() {
    this.storageClient = new GoogleStorageClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });

    this.bucketName = process.env.GOOGLE_BUCKET_NAME;
  }

  async upload(originalname: string, buffer: Buffer): Promise<string> {
    const fileName = `${Date.now()}-${originalname}`;
    await this.storageClient.bucket(this.bucketName).file(fileName).save(buffer);

    return this.getPublicUrl(fileName);
  }

  async generateSignedUrl(fileName: string) {
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + signedUrlExpires,
    };

    const [url] = await this.storageClient
      .bucket(this.bucketName)
      .file(fileName)
      .getSignedUrl(options);

    return url;
  }

  getPublicUrl(fileName: string) {
    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
  }
}

export { GoogleCloudeStorage };
