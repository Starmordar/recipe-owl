import EmptySearchResults from '@/app/(main)/recipes/_components/empty-search-results';
import { searchRecipes } from '@/src/entities/recipe';

import RecipePreviewCard from './components/preview-card';

interface RecipePreviewCardsProps {
  search: string;
  filters: Record<string, string | Array<string> | undefined>;
}

async function RecipePreviewCards({ search, filters }: RecipePreviewCardsProps) {
  const recipes = await searchRecipes(search, filters);
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
