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

@Controller()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('recipe')
  async getRecipes(): Promise<any> {
    const recipe = await this.recipeService.getRecipeById('1');
    console.log('recipe :>> ', recipe);
    const recipes = await this.recipeService.getRecipes();
    console.log('trigger', recipes);
    return this.recipeService.getRecipes();
  }

  @Get('recipe/:id')
  async getRecipeById(@Param('id') id: string): Promise<any> {
    console.log('trigger 2');
    const recipe = await this.recipeService.getRecipeById(id);
    console.log('recipe :>> ', recipe);
    return recipe;
  }

  @Post('recipe')
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() { data }: { data: any },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    console.log('data :>> ', data);
    return this.recipeService.createRecipe({ file, data: JSON.parse(data) });
  }
}
