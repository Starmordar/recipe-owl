import { Suspense } from 'react';

import { LatestRecipes } from './latest-recipes';
import { RecentlyViewed } from './recently-viewed';
import { RecipeOfTheDay } from './recipe-of-the-day';
import { RecipePreviewSectionSkeleton } from './recipe-preview';
import { TopWeekRecipes } from './top-week-recipes';

function HomePage() {
  return (
    <main className='page-container px-0 overflow-x-hidden gap-0'>
      <RecipeOfTheDay />

      <div className='flex flex-col gap-y-2 bg-background z-50 pt-2'>
        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <LatestRecipes />
        </Suspense>

        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <RecentlyViewed />
        </Suspense>

        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <TopWeekRecipes />
        </Suspense>
      </div>
    </main>
  );
}

export { HomePage };
