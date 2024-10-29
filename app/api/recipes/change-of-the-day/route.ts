import { NextRequest, NextResponse } from 'next/server';

import { createRecipeOfTheDay } from '@/src/views/home';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  await createRecipeOfTheDay();

  return NextResponse.json({ success: true });
}
