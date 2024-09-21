'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { SharedIngredient } from '@/lib/data/cart';

import RemoveIngredient from '../grocery-cart/components/remove-ingredient';
import { applyQuantityToUnit } from '../grocery-cart/utils/applyQuantityToUnit';

import type { PropsWithChildren } from 'react';

interface RecipeActionsDrawerProps extends PropsWithChildren {
  item: SharedIngredient;
}

function EditSharedIngredietDrawer({ children, item }: RecipeActionsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Action Buttons</DialogTitle>

        <ul className='my-4 space-y-4'>
          {item.ingredients.map(ingredient => (
            <li key={ingredient.id} className='flex gap-4 px-4'>
              <div className='relative min-w-[15vw] w-[15vw] h-[15vw]'>
                <Image
                  className='rounded-lg'
                  src={ingredient.recipe.imageUrl}
                  alt={`${ingredient.recipe.title} recipe image`}
                  fill
                  sizes='15vw'
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className='grow'>
                <p className='line-clamp-1'>{ingredient.recipe.title}</p>
                <span className='text-sm font-medium leading-none mr-2'>{item.name}</span>
                <span className='text-sm text-muted-foreground'>
                  {applyQuantityToUnit(ingredient.unit, ingredient.quantity)}
                </span>
              </div>

              <RemoveIngredient recipeIds={[ingredient.recipeId]} ingredientIds={[ingredient.id]} />
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default EditSharedIngredietDrawer;
