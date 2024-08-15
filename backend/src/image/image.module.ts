import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { SharpImageProcessor } from './processor/sharp.processor';
import { MinioService } from '@app/storage/minio/minio.service';

const imageProcessorFactory = {
  provide: 'image-processor',
  useFactory: () => new SharpImageProcessor(),
};

const storageService = {
  provide: 'image-storage',
  useClass: MinioService,
};

@Module({
  imports: [],
  providers: [imageProcessorFactory, storageService, ImageService],
  exports: [ImageService],
})
export class ImageModule {}
