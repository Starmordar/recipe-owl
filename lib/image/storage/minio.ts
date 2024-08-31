import * as Minio from 'minio';

import type { ImageStorage } from './type.ts';

class MinioStorage implements ImageStorage {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: Number(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });

    this.bucketName = process.env.MINIO_BUCKET_NAME;
    this.createBucketIfNotExists();
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (bucketExists) return;

    await this.minioClient.makeBucket(this.bucketName, 'eu-west-1');
  }

  async upload(originalname: string, buffer: Buffer): Promise<string> {
    const fileName = `${Date.now()}-${originalname}`;

    await this.minioClient.putObject(this.bucketName, fileName, buffer, buffer.byteLength);

    return this.getPublicUrl(fileName);
  }

  async getFileUrl(fileName: string) {
    return await this.minioClient.presignedUrl('GET', this.bucketName, fileName, 100000);
  }

  async getPublicUrl(fileName: string) {
    return (
      'https:' +
      '//' +
      process.env.MINIO_ENDPOINT +
      ':' +
      Number(process.env.MINIO_PORT) +
      '/' +
      this.bucketName +
      '/' +
      fileName
    );
  }

  async deleteFile(fileName: string) {
    await this.minioClient.removeObject(this.bucketName, fileName);
  }
}

export default MinioStorage;
