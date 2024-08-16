import { getRecipesPreview } from '@/lib/data';

import RecipePreviewCard from './components/preview-card';

interface RecipePreviewCardsProps {
  search: string;
  filters: { [key: string]: string | string[] | undefined };
}

export default async function RecipePreviewCards({ search, filters }: RecipePreviewCardsProps) {
  const data = await getRecipesPreview(search, filters);

  return (
    <div className='container grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {(data.recipes ?? []).map(recipe => (
        <RecipePreviewCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
