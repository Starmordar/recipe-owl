import { getRecipeDetails } from '@/lib/data/recipe';

import AddToCart from './components/add-to-cart';
import IngredientsTable from './components/ingredients-table';
import RecipeAuthor from './components/recipe-author';
import RecipeDescription from './components/recipe-description';
import RecipeImage from './components/recipe-image';
import RecipeMethod from './components/recipe-method';

interface RecipeProps {
  recipeId: number;
}

async function RecipeDetails({ recipeId }: RecipeProps) {
  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return null; // TODO: Custom Handler

  return (
    <>
      <section>
        <RecipeDescription recipe={recipe} />
        <RecipeImage recipe={recipe} />
        <RecipeAuthor recipe={recipe} />
      </section>

      <section>
        <div className='flex justify-between mb-2'>
          <h2 className='text-xl font-bold'>Ingredients</h2>
          <AddToCart recipe={recipe} />
        </div>
        <IngredientsTable ingredients={recipe.ingredients} />
      </section>

      <section>
        <h2 className='text-xl font-bold mb-2'>Method</h2>
        <RecipeMethod recipe={recipe} />
      </section>
    </>
  );
}

export default RecipeDetails;
