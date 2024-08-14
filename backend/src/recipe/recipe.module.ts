import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaModule } from '@app/database/prisma/prisma.module';
import { MinioModule } from '@app/minio/minio.module';

@Module({
  imports: [PrismaModule, MinioModule],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
