import EmptySearchResults from '@/app/(main)/recipes/_components/empty-search-results';
import { getRecipesPreview } from '@/lib/data/recipe';

import RecipePreviewCard from './components/preview-card';

interface RecipePreviewCardsProps {
  search: string;
  filters: Record<string, string | Array<string> | undefined>;
}

async function RecipePreviewCards({ search, filters }: RecipePreviewCardsProps) {
  const recipes = await getRecipesPreview(search, filters);
  if (recipes.length === 0) return <EmptySearchResults />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {(recipes ?? []).map(recipe => (
        <RecipePreviewCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipePreviewCards;
