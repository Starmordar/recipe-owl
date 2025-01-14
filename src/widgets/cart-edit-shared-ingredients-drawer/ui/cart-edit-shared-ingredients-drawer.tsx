'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';

import { applyQuantityToUnit } from '@/src/entities/cart';
import { RemoveIngredient } from '@/src/features/cart/remove-ingredient';
import { Drawer, DrawerContent, DrawerTrigger } from '@/src/shared/ui/drawer';

import type { CartSharedIngredient } from '@/src/entities/cart';
import type { PropsWithChildren } from 'react';

interface EditSharedIngredietDrawerProps extends PropsWithChildren {
  item: CartSharedIngredient;
}

function EditSharedIngredietDrawer({ children, item }: EditSharedIngredietDrawerProps) {
  const t = useTranslations('CartPage.EditIngredientsDrawer');

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>{t('title')}</DialogTitle>

        <ul className='my-4 space-y-4'>
          {item.ingredients.length === 0 && t('noIngredientsText')}

          {item.ingredients.map(ingredient => (
            <li key={ingredient.id} className='flex gap-4 px-4'>
              <div className='text-base grow'>
                <p className='line-clamp-1 mb-1'>{ingredient.recipe.title}</p>
                <span className='font-medium mr-2'>{item.name}</span>
                <span className='text-muted-foreground'>
                  {applyQuantityToUnit(ingredient.unit, ingredient.quantity)}
                </span>
              </div>

              <RemoveIngredient
                cartItemIds={[ingredient.itemId]}
                ingredientIds={[ingredient.id]}
                defaultChecked={false}
              />
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export { EditSharedIngredietDrawer };
