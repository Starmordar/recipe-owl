import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeMethodProps {
  recipe: RecipeDetails;
}

function RecipeMethod({ recipe }: RecipeMethodProps) {
  return (
    <ul className='flex flex-col gap-5'>
      {recipe.steps.map((instruction, index) => {
        return (
          <li key={index} className='flex items-start'>
            <div className='min-w-10 w-10 pt-1 pl-1'>
              <div className='flex justify-center items-center bg-foreground text-background w-6 h-6 rounded-full text-base'>
                <span>{index + 1}</span>
              </div>
            </div>

            <p>{instruction}</p>
          </li>
        );
      })}
    </ul>
  );
}

export { RecipeMethod };
