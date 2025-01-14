'use server';

import { validateRequest } from '@/src/shared/api/auth';
import { elastic } from '@/src/shared/api/elastic';

import { elasticRecipeViews } from '../config/elastic-index-name';

async function logRecipeView(recipeId: number) {
  const { user } = await validateRequest();

  await elastic.index({
    index: elasticRecipeViews,
    id: `${recipeId}:${user?.id}`,
    body: {
      recipeId: recipeId,
      userId: user?.id,
      date: new Date().toISOString(),
    },
  });
}

export { logRecipeView };
