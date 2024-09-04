import { applyQuantityToUnit } from '../utils/applyQuantityToUnit';

import RemoveIngredient from './remove-ingredient';

import type { CartRecipe } from '@/lib/data/cart';

interface RecipeCardProps {
  recipe: NonNullable<CartRecipe['recipe']>;
  ingredients: NonNullable<CartRecipe['ingredients']>;
  quantity: number;
}

function RecipeCardIngredients({ recipe, ingredients, quantity }: RecipeCardProps) {
  return (
    <div className='divide-y'>
      {ingredients.map(ingredient => {
        if (ingredient === null) return null;

        return (
          <div key={ingredient.name} className='flex w-full justify-between py-2'>
            <div>
              <p className='text-sm font-medium leading-none'>{ingredient.name}</p>
              <p className='text-sm text-muted-foreground'>
                {applyQuantityToUnit(ingredient.unit, quantity)}
              </p>
            </div>

            <RemoveIngredient recipeId={recipe.id} ingredientId={ingredient.id} />
          </div>
        );
      })}
    </div>
  );
}

export default RecipeCardIngredients;
