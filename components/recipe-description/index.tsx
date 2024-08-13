import { getRecipe } from '@/lib/data';
import { Clock1 } from 'lucide-react';
import Image from 'next/image';
import IngredientsTable from './components/ingredients-table';
import RecipeDescription from './components/recipe-description';
import RecipeImage from './components/recipe-image';
import RecipeMethod from './components/recipe-method';
import { getIngredients } from '@/app/actions';

interface RecipeProps {
  recipeId: number;
}

export default async function Recipe({ recipeId }: RecipeProps) {
  const recipe = await getRecipe(recipeId);
  if (!recipe) return null; // TODO: Custom Handler

  const ingredients = await getIngredients();
  console.log('ingredients :>> ', ingredients);

  console.log('recipe :>> ', recipe);

  return (
    <div className="container flex flex-col gap-4">
      <section>
        <RecipeDescription recipe={recipe} />
        <RecipeImage recipe={recipe} />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
        <IngredientsTable
          ingredients={recipe.ingredients.map((i) => ({ name: `${i}`, amount: '2tbsp' }))}
        />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Method</h2>
        <RecipeMethod recipe={recipe} />
      </section>
    </div>
  );
}
