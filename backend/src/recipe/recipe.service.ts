import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma/prisma.service';
import type { Prisma, Recipe } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(data: any): Promise<Recipe> {
    return this.prisma.recipe.create({
      data: { ...data, ingredients: { create: data.ingredients } },
    });
  }
}
