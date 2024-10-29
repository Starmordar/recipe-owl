import EmptySearchResults from '@/app/(main)/recipes/_components/empty-search-results';
import { RecipeCard, searchRecipes } from '@/src/entities/recipe';

interface RecipeCardsProps {
  search: string;
  filters: Record<string, string | Array<string> | undefined>;
}

async function RecipeCards({ search, filters }: RecipeCardsProps) {
  const recipes = await searchRecipes(search, filters);
  if (recipes.length === 0) return <EmptySearchResults />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {(recipes ?? []).map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export { RecipeCards };
