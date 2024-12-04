import { NextRequest, NextResponse } from 'next/server';

import { dailyRefresh } from '@/src/views/home/api/daily-refresh';

export async function GET(req: NextRequest) {
  // const authHeader = req.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }

  await dailyRefresh();
  return NextResponse.json({ success: true });
}
