import { getRecipe } from '@/lib/data';
import { Clock1 } from 'lucide-react';
import Image from 'next/image';
import IngredientsTable from './components/ingredients-table';

interface RecipeProps {
  recipeId: number;
}

export default async function Recipe({ recipeId }: RecipeProps) {
  const recipe = await getRecipe(recipeId);
  if (!recipe) return null; // TODO: Custom Handler

  console.log('recipe :>> ', recipe);
  return (
    <div className="flex flex-col px-4 py-6">
      <h1 className="mb-2">{recipe.name}</h1>

      <div className="flex items-center gap-2 mb-4">
        <Clock1 size="16px" />
        <p>Ready is under 2.5 hours</p>
      </div>

      <Image
        className="rounded-lg"
        src={recipe.image}
        alt="Picture of the author"
        width={500}
        height={1000}
      />

      <div className="mb-2">
        <p>Ingridients for</p>
        <span>2 servings</span>
      </div>

      <IngredientsTable
        ingredients={recipe.ingredients.map((i) => ({ name: `${i}_${i}`, amount: 'random' }))}
      />

      <div className="mt-6">
        <p className="mb-2">Preparation</p>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>Total Time</p>
            <p>2h 15min</p>
          </div>

          <div className="flex flex-col">
            <p>Prep Time</p>
            <p>15min</p>
          </div>

          <div className="flex flex-col">
            <p>Cook Time</p>
            <p>2h</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {recipe.instructions.map((instruction, index) => {
          return (
            <div className="flex items-start">
              <p className="flex min-w-10 w-10">{index + 1}</p>
              <span>{instruction}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
