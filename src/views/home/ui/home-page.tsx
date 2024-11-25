import { Suspense } from 'react';

import { LatestRecipes } from './latest-recipes';
import { RecentlyViewed } from './recently-viewed';
import { RecipeOfTheDay } from './recipe-of-the-day';
import { RecipePreviewSectionSkeleton } from './recipe-preview';
import { RecipesByTagSection } from './recipes-by-tag';
import { TopWeekRecipes } from './top-week-recipes';

function HomePage() {
  return (
    <main className='page-container px-0 overflow-x-hidden gap-0'>
      <RecipeOfTheDay />

      <div className='flex flex-col gap-y-4 bg-background z-50 py-4'>
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
          <RecipesByTagSection sectionTitle='Master the Kitchen' tagName='Level Up' />
        </Suspense>

        <Suspense fallback={<RecipePreviewSectionSkeleton />}>
          <RecipesByTagSection sectionTitle='Flavors of Asia' tagName='Asian' />
        </Suspense>
      </div>
    </main>
  );
}

export { HomePage };
