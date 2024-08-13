import { Controller, Get, Body } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import type { Ingredient } from '@prisma/client';

@Controller()
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('ingredients')
  async getUniqIngredients(@Body() data: any): Promise<any> {
    return this.ingredientService.getUniqIngredients();
  }
}
