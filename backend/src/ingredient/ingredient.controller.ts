import { Controller, Get, Query } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import type { Ingredient } from '@prisma/client';

@Controller()
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('ingredients')
  async getUniqIngredients(
    @Query() { search }: { search: string },
  ): Promise<Array<Ingredient>> {
    return this.ingredientService.getUniqIngredients(search);
  }
}
