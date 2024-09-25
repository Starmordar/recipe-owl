'use client';

import { useUserCart } from '@/context/userCartProvider';
import { CartRecipe } from '@/lib/data/cart';

import { applyQuantityToUnit } from '../../utils/applyQuantityToUnit';
import IngredientsSection from '../ingredients-section';
import RemoveIngredient from '../ingredients-section/components/remove-ingredient';

import RecipeCardHeader from './components/section-header';

type Ingredient = CartRecipe['ingredients'][number];

interface RecipeSectionProps {
  recipeId: number;
}

function RecipeSection({ recipeId }: RecipeSectionProps) {
  const { cartDetails } = useUserCart();
  const { items } = cartDetails;

  const cartItem = items.find(item => item.recipe.id === recipeId);
  if (!cartItem) return null;

  return (
    <div className='flex flex-col gap-y-2 pb-4 pt-4 first:pt-0 last:pb-0'>
      <div className='flex flex-row space-y-0 gap-4'>
        <RecipeCardHeader recipe={cartItem.recipe} quantity={cartItem.quantity} />
      </div>

      <IngredientsSection<Ingredient>
        ingredients={cartItem.ingredients}
        renderContent={ingredient => (
          <>
            <div>
              <p className='font-medium leading-none'>{ingredient.name}</p>
              <p className='text-sm text-muted-foreground'>
                {applyQuantityToUnit(ingredient.unit, cartItem.quantity)}
              </p>
            </div>
            <RemoveIngredient
              cartItemIds={[ingredient.itemId]}
              ingredientIds={[ingredient.id]}
              defaultChecked={false}
            />
          </>
        )}
        checked={false}
      />
    </div>
  );
}

export default RecipeSection;
