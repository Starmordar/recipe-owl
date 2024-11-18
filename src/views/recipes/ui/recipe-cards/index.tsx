import { RecipeCard, RecipeSearchResult } from '@/src/entities/recipe';

interface RecipeCardsProps {
  recipes: Array<RecipeSearchResult>;
}

function RecipeCards({ recipes }: RecipeCardsProps) {
  return (
    <>
      {(recipes ?? []).map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
}

export { RecipeCards };
