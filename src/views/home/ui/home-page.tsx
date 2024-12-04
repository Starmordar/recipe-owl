import { Suspense } from 'react';

import { LatestRecipes } from './latest-recipes';
import { QuickLinks } from './quick-links';
import { RecentlyViewed } from './recently-viewed';
import { RecipeCategories } from './recipe-categories';
import { RecipeOfTheDay } from './recipe-of-the-day';
import { RecipePreviewSectionSkeleton } from './recipe-preview';
import { TopWeekRecipes } from './top-week-recipes';

function HomePage() {
  return (
    <main className='page-container px-0 overflow-x-hidden gap-0'>
      <RecipeOfTheDay />

      <div className='flex flex-col gap-y-6 bg-background z-50 p-4'>
        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <LatestRecipes />
        </Suspense>

        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <RecentlyViewed />
        </Suspense>

        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <TopWeekRecipes />
        </Suspense>

        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <RecipeCategories />
        </Suspense>

        <QuickLinks />
      </div>
    </main>
  );
}

export { HomePage };
