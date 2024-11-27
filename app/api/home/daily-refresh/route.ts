import { NextRequest, NextResponse } from 'next/server';

import { redis } from '@/src/shared/api/redis/client';
import { recipeCategoriesKey } from '@/src/shared/api/redis/keys';
import { createRecipeOfTheDay } from '@/src/views/home';

import { homeSections } from './home-sections';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const randomIndex = (length: number) => Math.floor(Math.random() * length);
  const nextSections = homeSections.map(
    ({ categories }) => categories[randomIndex(categories.length)],
  );

  const serializedData = JSON.stringify(nextSections);
  await redis.set(recipeCategoriesKey, serializedData);

  await createRecipeOfTheDay();

  return NextResponse.json({ success: true });
}
