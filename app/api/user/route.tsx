import { NextResponse } from 'next/server';

import { validateRequest } from '@/src/entities/session';

export async function GET() {
  const { user } = await validateRequest();
  return NextResponse.json(user);
}
