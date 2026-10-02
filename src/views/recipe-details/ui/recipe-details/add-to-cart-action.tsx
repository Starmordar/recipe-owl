import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ProtectedDrawer } from '@/src/entities/session/server';
import { Button } from '@/src/shared/ui/button';
import { AddRecipeToCartDrawer } from '@/src/widgets/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  recipe: RecipeDetails;
  userId: string | undefined;
}

function AddToCartAction({ recipe }: AddToCartActionProps) {
  const t = useTranslations('RecipeDetailsPage.AddToCartDrawer');

  return (
    <ProtectedDrawer
      title={t('requireAuthTitle')}
      description={t('requireAuthText')}
      renderTrigger={() => (
        <Button className='w-full gap-x-2 text-base' size='lg'>
          <ShoppingCart className='h-5 w-5' /> {t('trigger')}
        </Button>
      )}
    >
      <AddRecipeToCartDrawer recipe={recipe}>
        <Button className='w-full gap-x-2 text-base' size='lg'>
          <ShoppingCart className='h-5 w-5' /> {t('trigger')}
        </Button>
      </AddRecipeToCartDrawer>
    </ProtectedDrawer>
  );
}

export { AddToCartAction };
