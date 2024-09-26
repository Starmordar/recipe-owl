'use client';

import { Card } from '@/components/ui/card';
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
    <Card className='flex flex-col p-4'>
      <div className='flex flex-row space-y-0 gap-4'>
        <RecipeCardHeader recipe={cartItem.recipe} quantity={cartItem.quantity} />
      </div>

      <IngredientsSection<Ingredient>
        ingredients={cartItem.ingredients}
        renderContent={ingredient => (
          <>
            <div className='flex gap-x-2 text-base'>
              <p className='font-medium'>{ingredient.name}</p>
              <p className='text-muted-foreground'>
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
    </Card>
  );
}

export default RecipeSection;
