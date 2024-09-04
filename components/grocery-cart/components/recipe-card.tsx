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
    <Card>
      <CardHeader className='flex flex-row p-4 space-y-0 gap-4'>
        <RecipeCardHeader recipe={cartItem.recipe} />
      </CardHeader>

      <CardContent className='grid p-4 pt-0 gap-2'>
        <RecipeCardIngredients recipe={cartItem.recipe} ingredients={cartItem.ingredients} />
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
