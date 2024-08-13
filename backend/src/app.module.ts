import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [PrismaModule, RecipeModule, IngredientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
