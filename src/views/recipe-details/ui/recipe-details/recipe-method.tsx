import { Check } from 'lucide-react';

import { cn } from '@/src/shared/lib/classnames';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeMethodProps {
  recipe: RecipeDetails;
}

// Every step is a checkbox label, so tapping it marks the step as done without any client state.
function RecipeMethod({ recipe }: RecipeMethodProps) {
  return (
    <ol className='divide-y'>
      {recipe.steps.map((instruction, index) => {
        return (
          <li key={index}>
            <label className='relative flex cursor-pointer items-start gap-x-3 py-4'>
              <input type='checkbox' className='peer sr-only' />

              <span
                className={cn(
                  'flex shrink-0 justify-center items-center w-8 h-8 rounded-full text-sm font-semibold bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200',
                  'peer-checked:bg-muted peer-checked:text-muted-foreground peer-checked:[&>span]:hidden peer-checked:[&>svg]:block',
                  'ring-ring ring-offset-2 ring-offset-background peer-focus-visible:ring-2',
                )}
              >
                <span>{index + 1}</span>
                <Check className='hidden h-4 w-4' aria-hidden='true' />
              </span>

              <p className='min-w-0 pt-0.5 leading-relaxed break-words peer-checked:text-muted-foreground lg:text-lg lg:leading-relaxed'>
                {instruction}
              </p>
            </label>
          </li>
        );
      })}
    </ol>
  );
}

export { RecipeMethod };
