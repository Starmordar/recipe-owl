import { RecipeCard, RecipeSearchResult } from '@/src/entities/recipe';

const imageSizes = '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 270px';

interface RecipeCardsProps {
  recipes: Array<RecipeSearchResult>;
}

function RecipeCards({ recipes }: RecipeCardsProps) {
  return (
    <>
      {(recipes ?? []).map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          className='aspect-[4/3]'
          imageSizes={imageSizes}
        />
      ))}
    </>
  );
}

export { RecipeCards };
