import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeIngredientsSectionProps {
  ingredients: Array<RecipeDetails['ingredients'][number]>;
}

// From `lg` up a long list scrolls inside its pinned card, with the scrollbar in the card's padding.
function RecipeIngredientsSection({ ingredients }: RecipeIngredientsSectionProps) {
  return (
    <ul className='divide-y text-base lg:-mr-3 lg:min-h-0 lg:overflow-y-auto lg:pr-3'>
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
