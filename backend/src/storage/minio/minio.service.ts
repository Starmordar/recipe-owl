import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import type { Storage } from '../types';

@Injectable()
export class MinioService implements Storage {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT')!,
      port: Number(this.configService.get('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY')!,
      secretKey: this.configService.get('MINIO_SECRET_KEY')!,
    });

    this.bucketName = this.configService.get('MINIO_BUCKET_NAME')!;
    this.createBucketIfNotExists();
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (bucketExists) return;

    await this.minioClient.makeBucket(this.bucketName, 'eu-west-1');
  }

  async upload(originalname: string, buffer: Buffer): Promise<string> {
    const fileName = `${Date.now()}-${originalname}`;

    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      buffer,
      buffer.byteLength,
    );

    return this.getPublicUrl(fileName);
  }

  async getFileUrl(fileName: string) {
    return await this.minioClient.presignedUrl(
      'GET',
      this.bucketName,
      fileName,
      100000,
    );
  }

  async getPublicUrl(fileName: string) {
    return (
      'http:' +
      '//' +
      this.configService.get('MINIO_ENDPOINT') +
      ':' +
      Number(this.configService.get('MINIO_PORT')) +
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
