import path from 'path';

import { Client as ElasticClient } from '@elastic/elasticsearch';
import { Prisma, PrismaClient } from '@prisma/client';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: path.resolve(__dirname, '../../.env') });

type RecipePayload = Prisma.RecipeGetPayload<{
  include: { ingredients: { orderBy: { order: 'asc' } }; user: true };
}>;

const prismaClient = new PrismaClient();
const elasticClient = new ElasticClient({ node: process.env.ELASTIC_NODE });

async function backfillRecipes() {
  try {
    const recipes = await prismaClient.recipe.findMany({
      include: { ingredients: { orderBy: { order: 'asc' } }, user: true },
    });

    const bulkOperations = recipes.flatMap(recipe => [
      { update: { _index: 'recipes', _id: recipe.id.toString() } },
      { doc: mapToElastic(recipe), doc_as_upsert: true },
    ]);

    const { body: bulkResponse } = await elasticClient.bulk({
      refresh: true,
      body: bulkOperations,
    });

    if (bulkResponse.errors) console.error('Errors in bulk upload:', bulkResponse.errors);
    else console.log('Successfully backfilled');
  } catch (error) {
    console.error('Error during backfill:', error);
  }
}

function mapToElastic(recipe: RecipePayload) {
  return {
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients.map(i => i.name),
    imageUrl: recipe.imageUrl,
    tags: recipe.tags,
    cookTime: recipe.cookTime,
    createdById: recipe.createdById,
    createdAt: recipe.createdAt,
  };
}

backfillRecipes();
