import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from './storage/minio/minio.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    MinioModule,
    RecipeModule,
    ImageModule,
    IngredientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
