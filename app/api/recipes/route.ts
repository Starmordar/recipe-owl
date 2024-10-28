import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/src/shared/api/prisma-client';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('search') ?? '';
  const recipes = prisma.recipe.findMany();

  return NextResponse.json(recipes);
}
