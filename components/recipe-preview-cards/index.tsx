import RecipePreviewCard from './components/preview-card';
import { getRecipesPreview } from '@/lib/data';

interface RecipePreviewCardsProps {
  search: string;
  filters: { [key: string]: string | string[] | undefined };
}

export default async function RecipePreviewCards({ search, filters }: RecipePreviewCardsProps) {
  const data = await getRecipesPreview(search, filters);
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));

  return (
    <div className="px-2 py-4 grid grid-cols-2 gap-2">
      {(data.recipes ?? []).map((recipe) => (
        <RecipePreviewCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
