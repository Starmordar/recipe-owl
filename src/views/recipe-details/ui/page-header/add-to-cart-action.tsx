import { CirclePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ProtectedDrawer } from '@/src/entities/session/server';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { AddRecipeToCartDrawer } from '@/src/widgets/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  recipe: RecipeDetails;
}

function AddToCartAction({ recipe }: AddToCartActionProps) {
  const t = useTranslations('RecipeDetailsPage.AddToCartDrawer');

  return (
    <ProtectedDrawer
      title={t('requireAuthTitle')}
      description={t('requireAuthText')}
      renderTrigger={() => <HeaderIconButton Icon={<CirclePlus />} />}
    >
      <AddRecipeToCartDrawer recipe={recipe}>
        <HeaderIconButton Icon={<CirclePlus />} />
      </AddRecipeToCartDrawer>
    </ProtectedDrawer>
  );
}

export { AddToCartAction };
