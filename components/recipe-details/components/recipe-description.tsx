import type { Recipe } from '@/types/recipe';

interface RecipeDescriptionProps {
  recipe: Recipe;
}

function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  return (
    <div className='mb-4'>
      <h1 className='text-xl font-bold mb-1'>{recipe.title}</h1>
      <p className='text-sm leading-5'>{recipe.description}</p>
    </div>
  );
}

export default RecipeDescription;
