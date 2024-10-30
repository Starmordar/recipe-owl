import { NextResponse } from 'next/server';

import { validateRequest } from '@/src/shared/api/auth';

export async function GET() {
  const { user } = await validateRequest();
  return NextResponse.json(user);
}
