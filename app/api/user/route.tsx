import { NextResponse } from 'next/server';

import { validateRequest } from '@/entities/session';

export async function GET() {
  const { user } = await validateRequest();
  return NextResponse.json(user);
}
