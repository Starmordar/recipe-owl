import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CartRecipe } from '@/lib/data/cart';

import RecipeCardHeader from './recipe-card-header';
import RecipeCardIngredients from './recipe-card-ingrediets';

interface RecipeCardProps {
  cartItem: CartRecipe;
}

function RecipeCard({ cartItem }: RecipeCardProps) {
  if (cartItem.recipe === null || cartItem.ingredients === null) return null;

  return (
    <div className='flex flex-col gap-y-2 pb-4 pt-4 first:pt-0 last:pb-0'>
      <div className='flex flex-row space-y-0 gap-4'>
        <RecipeCardHeader recipe={cartItem.recipe} quantity={cartItem.quantity} />
      </div>

      <div className='grid gap-2'>
        <RecipeCardIngredients
          recipe={cartItem.recipe}
          ingredients={cartItem.ingredients}
          quantity={cartItem.quantity}
        />
      </div>
    </div>
  );
}

export default RecipeCard;
