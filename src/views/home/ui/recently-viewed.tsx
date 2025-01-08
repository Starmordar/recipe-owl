import { getRecentlyViewed } from '@/src/entities/recipe';
import { validateRequest } from '@/src/shared/api/auth';

import { RecipePreviewSection } from './recipe-preview';

async function RecentlyViewed() {
  const { user } = await validateRequest();
  if (!user) return null;

  const recipes = await getRecentlyViewed(user.id);
  if (recipes.length === 0) return null;

  return <RecipePreviewSection sectionTitle='Recently Viewed' recipes={recipes} />;
}

export { RecentlyViewed };
