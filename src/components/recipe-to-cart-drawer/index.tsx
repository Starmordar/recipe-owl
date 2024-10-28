'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { PropsWithChildren, useState } from 'react';

import IngredientsForm from './components/ingredients-form';
import IngredientsFormHeader from './components/ingredients-form-header';
import useIngredientsForm from './hooks/useIngredientsForm';

import type { FormValues } from './constants/schema';
import type { RecipeDetails } from '@/src/entities/recipe';

import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';

interface AddToCartDrawerProps extends PropsWithChildren {
  recipe: RecipeDetails;
}

function AddToCartDrawer({ recipe, children }: AddToCartDrawerProps) {
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
          <DialogTitle>Add to Cart</DialogTitle>
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

        <DrawerFooter>
          <Button
            form='ingredients-to-cart-form'
            className='w-full'
            loading={isPending}
            loadingText='Adding...'
          >
            Add items
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddToCartDrawer;
