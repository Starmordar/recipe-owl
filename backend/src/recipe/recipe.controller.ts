import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Recipe } from '@prisma/client';

@Controller()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('recipe')
  async getRecipes(): Promise<any> {
    return this.recipeService.getRecipes();
  }

  @Get('recipe/:id')
  async getRecipeById(@Param('id') id: string): Promise<any> {
    const recipe = await this.recipeService.getRecipeById(id);
    return recipe;
  }

  @Post('recipe')
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() { data }: { data: any },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Recipe> {
    return this.recipeService.createRecipe({ file, data: JSON.parse(data) });
  }
}
