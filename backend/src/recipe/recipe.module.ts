import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaModule } from '@app/database/prisma/prisma.module';
import { ImageModule } from '@app/image/image.module';

@Module({
  imports: [PrismaModule, ImageModule],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
