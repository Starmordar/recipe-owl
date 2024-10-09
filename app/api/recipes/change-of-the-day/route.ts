import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { publicUrls } from '@/config/url';
import { createRecipeOfTheDay } from '@/lib/data/recipe';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  await createRecipeOfTheDay();
  revalidatePath(publicUrls.home);

  return NextResponse.json({ success: true });
}
