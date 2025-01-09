import { CirclePlus } from 'lucide-react';
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
  const t = useTranslations('RecipeDetails');

  return (
    <ProtectedDrawer
      title={t('Protected.addToCartTitle')}
      description={t('Protected.addToCartDescription')}
      renderTrigger={() => (
        <Button className='gap-x-3 text-base' variant='outline' size='xs'>
          {t('AddToCart.trigger')} <CirclePlus className='h-5 w-5' />
        </Button>
      )}
    >
      <AddRecipeToCartDrawer recipe={recipe}>
        <Button className='gap-x-3 text-base' variant='outline' size='xs'>
          {t('AddToCart.trigger')} <CirclePlus className='h-5 w-5' />
        </Button>
      </AddRecipeToCartDrawer>
    </ProtectedDrawer>
  );
}

export { AddToCartAction };
