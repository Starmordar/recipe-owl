import React from 'react';

import { RecipesPage } from '@/src/views/recipes';

interface PageProps {
  searchParams: {
    search?: string;
    [key: string]: string | Array<string> | undefined;
  };
}

function Page({ searchParams }: PageProps) {
  return <RecipesPage searchParams={searchParams} />;
}

export default Page;
