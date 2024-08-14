import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma/prisma.service';
import { MinioService } from '@app/minio/minio.service';

import type { Recipe } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(
    private prisma: PrismaService,
    private minio: MinioService,
  ) {}

  async getRecipeById(id: string) {
    return this.prisma.recipe.findFirst({
      where: { id: Number(id) },
      include: { ingredients: true },
    });
  }

  async getRecipes() {
    return this.prisma.recipe.findMany({ include: { ingredients: true } });
  }

  async createRecipe({
    data,
    file,
  }: {
    data: any;
    file: Express.Multer.File;
  }): Promise<Recipe> {
    const imageUrl = await this.minio.uploadFile(file);
    console.log('Uploaded file URL :>> ', imageUrl);

    return this.prisma.recipe.create({
      data: { ...data, imageUrl, ingredients: { create: data.ingredients } },
    });
  }
}
