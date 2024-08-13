import { Controller, Post, Body } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import type { Recipe } from '@prisma/client';

@Controller()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('recipe')
  async createRecipe(@Body() data: any): Promise<any> {
    console.log('data :>> ', data);
    delete data.image;
    return this.recipeService.createRecipe(data);
  }
}
