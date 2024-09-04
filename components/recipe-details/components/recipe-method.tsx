import type { RecipeDetails } from '@/types/api';

interface MethodProps {
  recipe: RecipeDetails;
}

function RecipeMethod({ recipe }: MethodProps) {
  return (
    <ul className='flex flex-col gap-5'>
      {recipe.steps.map((instruction, index) => {
        return (
          <li key={index} className='flex items-start'>
            <div className='min-w-10 w-10 pt-1 pl-1'>
              <div className='flex justify-center items-center bg-primary opacity-80 w-[22px] h-[22px] rounded-full text-primary-foreground text-sm'>
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

export default RecipeMethod;
