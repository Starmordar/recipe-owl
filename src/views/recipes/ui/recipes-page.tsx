import React from 'react';

import { searchFilter, searchRecipes } from '@/src/entities/recipe';

import { InfiniteLoad } from './infinite-load';
import { RecipeCards } from './recipe-cards';
import { EmptySearchResults } from './recipe-cards/empty-results';
import { RecipesPageHeader } from './recipes-page-header';

interface RecipesPageProps {
  searchParams: {
    [searchFilter]?: string;
    [key: string]: string | Array<string> | undefined;
  };
}

async function RecipesPage({ searchParams }: RecipesPageProps) {
  const search = searchParams?.[searchFilter] ?? '';

  const recipes = await searchRecipes(search, searchParams, 0);
  if (recipes.length === 0) return <EmptySearchResults />;

  return (
    <>
      <RecipesPageHeader />

      <main className='page-container pt-2'>
        <InfiniteLoad search={search} filters={searchParams}>
          <RecipeCards recipes={recipes} />
        </InfiniteLoad>
      </main>
    </>
  );
}

export { RecipesPage };
