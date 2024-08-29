import { getRecipesPreview } from '@/lib/data/recipe';

import RecipePreviewCard from './components/preview-card';

interface RecipePreviewCardsProps {
  search: string;
  filters: Record<string, string | Array<string> | undefined>;
}

async function RecipePreviewCards({ search, filters }: RecipePreviewCardsProps) {
  const data = await getRecipesPreview(search, filters);
  console.log('data :>> ', data);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {(data.recipes ?? []).map(recipe => (
        <RecipePreviewCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipePreviewCards;
