import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeIngredientsSectionProps {
  ingredients: Array<RecipeDetails['ingredients'][number]>;
}

function RecipeIngredientsSection({ ingredients }: RecipeIngredientsSectionProps) {
  return (
    <ul className='divide-y text-base'>
      {ingredients.map(ingredient => (
        <li key={ingredient.id} className='flex items-baseline justify-between gap-x-4 py-3'>
          <span className='min-w-0 break-words'>{ingredient.name}</span>
          <span className='shrink-0 max-w-[45%] font-semibold break-words text-right'>
            {ingredient.unit}
          </span>
        </li>
      ))}
    </ul>
  );
}

export { RecipeIngredientsSection };
