import RecipePreviewCard from './components/preview-card';
import { getRecipesPreview } from '@/lib/data';

interface RecipePreviewCardsProps {
  search: string;
  filters: { [key: string]: string | string[] | undefined };
}

export default async function RecipePreviewCards({ search, filters }: RecipePreviewCardsProps) {
  const data = await getRecipesPreview(search, filters);
  console.log('data :>> ', data);

  return (
    <div className="container grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4">
      {(data.recipes ?? []).map((recipe) => (
        <RecipePreviewCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
