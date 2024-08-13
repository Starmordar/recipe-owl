import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('recipe')
  async getRecipes(): Promise<any> {
    return this.recipeService.getRecipes();
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
