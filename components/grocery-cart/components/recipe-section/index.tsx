'use client';

import { useUserCart } from '@/context/userCartProvider';
import { Card } from '@/shared/ui/card';

import IngredientsList from './components/ingredients-list';
import RecipeCardHeader from './components/section-header';

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

      <IngredientsList recipeId={recipeId} />
    </Card>
  );
}

export default RecipeSection;
