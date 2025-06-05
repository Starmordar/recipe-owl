import React from 'react';

import { RecipesPage } from '@/src/views/recipes';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    [key: string]: string | Array<string> | undefined;
  }>;
}

async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  return <RecipesPage searchParams={searchParams} />;
}

export default Page;
