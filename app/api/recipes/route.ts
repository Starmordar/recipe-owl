import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/prisma/prisma-client';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('search') ?? '';

  console.log('query :>> ', query);
  const recipes = prisma.recipe.findMany();

  return NextResponse.json(recipes);
}
