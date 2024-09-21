'use client';

import { CartRecipe } from '@/lib/data/cart';

import { applyQuantityToUnit } from '../utils/applyQuantityToUnit';

import RecipeCardHeader from './recipe-card-header';
import RecipeCardIngredients from './recipe-card-ingrediets';
import RemoveIngredient from './remove-ingredient';

interface RecipeCardProps {
  cartItem: CartRecipe;
}

function RecipeCard({ cartItem }: RecipeCardProps) {
  return (
    <div className='flex flex-col gap-y-2 pb-4 pt-4 first:pt-0 last:pb-0'>
      <div className='flex flex-row space-y-0 gap-4'>
        <RecipeCardHeader recipe={cartItem.recipe} quantity={cartItem.quantity} />
      </div>

      <RecipeCardIngredients<CartRecipe['ingredients'][number]>
        ingredients={cartItem.ingredients}
        renderContent={ingredient => (
          <>
            <div>
              <p className='text-sm font-medium leading-none'>{ingredient.name}</p>
              <p className='text-sm text-muted-foreground'>
                {applyQuantityToUnit(ingredient.unit, cartItem.quantity)}
              </p>
            </div>
            <RemoveIngredient recipeIds={[ingredient.recipeId]} ingredientIds={[ingredient.id]} />
          </>
        )}
      />
    </div>
  );
}

export default RecipeCard;
