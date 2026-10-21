import React from 'react';

import { searchFilter, searchPageSize, searchRecipes } from '@/src/entities/recipe';

import { InfiniteLoad } from './infinite-load';
import { RecipeCards } from './recipe-cards';
import { EmptySearchResults } from './recipe-cards/empty-results';
import { RecipesHeading } from './recipes-heading';
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

  return (
    <>
      <RecipesPageHeader />

      <main className='page-container lg:max-w-6xl lg:px-8 pt-2 md:pt-4'>
        <RecipesHeading search={search} filters={searchParams} />

        {recipes.length === 0 ? (
          <EmptySearchResults />
        ) : (
          <InfiniteLoad
            search={search}
            filters={searchParams}
            hasMore={recipes.length === searchPageSize}
          >
            <RecipeCards recipes={recipes} />
          </InfiniteLoad>
        )}
      </main>
    </>
  );
}

export { RecipesPage };
