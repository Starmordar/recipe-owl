import { getRecentlyViewed } from '@/src/entities/recipe';
import { validateRequest } from '@/src/shared/api/auth';

import { LatestRecipeCard } from '../latest-recipes/latest-recipe';

async function RecentlyViewed() {
  const { user } = await validateRequest();
  if (!user) return null;

  const recentlyViewed = await getRecentlyViewed(user.id);
  if (recentlyViewed.length === 0) return null;

  return (
    <section className='page-container pt-0 gap-y-2 pb-0'>
      <h2 className='text-xl font-semibold'>Recently Viewed</h2>
      <div className='flex flex-nowrap gap-x-3 pb-2 overflow-x-auto hide-scrollbar'>
        {recentlyViewed.map(recipe => (
          <LatestRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}

export { RecentlyViewed };
