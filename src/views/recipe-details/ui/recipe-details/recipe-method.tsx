import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeMethodProps {
  recipe: RecipeDetails;
}

function RecipeMethod({ recipe }: RecipeMethodProps) {
  return (
    <ol className='flex flex-col gap-5'>
      {recipe.steps.map((instruction, index) => {
        return (
          <li key={index} className='flex items-start gap-x-3'>
            <div className='flex shrink-0 justify-center items-center w-8 h-8 rounded-full text-sm font-semibold bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200'>
              <span>{index + 1}</span>
            </div>

            <p className='min-w-0 pt-0.5 leading-relaxed break-words'>{instruction}</p>
          </li>
        );
      })}
    </ol>
  );
}

export { RecipeMethod };
