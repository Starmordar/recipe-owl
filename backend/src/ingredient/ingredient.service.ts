import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma/prisma.service';
import type { Ingredient } from '@prisma/client';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async getUniqIngredients(query: string): Promise<Array<Ingredient>> {
    const ingredients = await this.prisma.ingredient.findMany({
      distinct: ['name'],
      where: { name: { contains: query } },
    });

    return ingredients;
  }
}
