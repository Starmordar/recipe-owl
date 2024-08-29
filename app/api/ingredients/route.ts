import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/prisma/prisma-client';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('search') ?? '';

  const ingredients = await prisma.ingredient.findMany({
    distinct: ['name'],
    where: { name: { contains: query } },
  });

  return NextResponse.json(ingredients);
}
