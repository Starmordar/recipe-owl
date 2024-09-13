import { NextRequest, NextResponse } from 'next/server';

import { validateRequest } from '@/app/(auth)/actions';

export async function GET() {
  const { user } = await validateRequest();
  return NextResponse.json(user);
}
