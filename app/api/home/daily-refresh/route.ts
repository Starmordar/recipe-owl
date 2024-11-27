import { NextRequest, NextResponse } from 'next/server';

import { redis } from '@/src/shared/api/redis/client';
import { recipeCategoriesKey } from '@/src/shared/api/redis/keys';
import { createRecipeOfTheDay } from '@/src/views/home';

import { recipeCategoryGroups } from './recipe-category-groups';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const randomIndex = (length: number) => Math.floor(Math.random() * length);
  const recipeCategories = recipeCategoryGroups.map(
    ({ categories }) => categories[randomIndex(categories.length)],
  );

  const data = JSON.stringify(recipeCategories);
  await redis.set(recipeCategoriesKey, data);

  await createRecipeOfTheDay();

  return NextResponse.json({ success: true });
}
