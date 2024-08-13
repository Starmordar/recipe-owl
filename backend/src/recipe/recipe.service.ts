import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma/prisma.service';
import type { Recipe } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async getRecipes() {
    return this.prisma.recipe.findMany();
  }

  async createRecipe({
    data,
    file,
  }: {
    data: any;
    file: Express.Multer.File;
  }): Promise<Recipe> {
    return this.prisma.recipe.create({
      data: {
        ...data,
        image: file.buffer,
        ingredients: { create: data.ingredients },
      },
    });
  }
}
