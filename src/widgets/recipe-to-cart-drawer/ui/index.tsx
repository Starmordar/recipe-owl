'use client';

import { useTranslations } from 'next-intl';
import { PropsWithChildren, useState } from 'react';

import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';

import { useIngredientsForm } from '../lib/use-ingredients-form';

import { IngredientsForm } from './ingredients-form';
import { IngredientsFormHeader } from './ingredients-form-header';

import type { FormValues } from '../model/schema';
import type { RecipeDetails } from '@/src/entities/recipe';

interface AddRecipeToCartDrawerProps extends PropsWithChildren {
  recipe: RecipeDetails;
}

function AddRecipeToCartDrawer({ recipe, children }: AddRecipeToCartDrawerProps) {
  const t = useTranslations('RecipeDetailsPage.AddToCartDrawer');
  const { form, onSubmit, isPending } = useIngredientsForm({ recipe });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  function handleDrawerToggle(isOpen: boolean) {
    if (!isOpen) form.reset();
    setIsDrawerOpen(isOpen);
  }

  async function handleSubmit(values: FormValues) {
    await onSubmit(values, quantity).finally(() => handleDrawerToggle(false));
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleDrawerToggle}>
      <DrawerTrigger onClick={() => handleDrawerToggle(true)} asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription className='sr-only'>{t('description')}</DrawerDescription>
        </DrawerHeader>

        <IngredientsFormHeader
          form={form}
          recipe={recipe}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <IngredientsForm
          form={form}
          onSubmit={handleSubmit}
          quantity={quantity}
          ingredients={recipe.ingredients}
        />

        <DrawerFooter className='flex flex-row w-full'>
          <DrawerClose className='flex-1' asChild>
            <Button variant='outline'>{t('cancelAction')}</Button>
          </DrawerClose>
          <Button
            form='ingredients-to-cart-form'
            className='flex-1'
            loading={isPending}
            loadingText={t('submitActionPending')}
          >
            {t('submitAction')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { AddRecipeToCartDrawer };
