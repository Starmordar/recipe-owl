'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';

import IngredientsForm from './components/ingredients-form';
import IngredientsFormHeader from './components/ingredients-form-header';
import { FormValues } from './constants/schema';
import useIngredientsForm from './hooks/useIngredientsForm';

import type { RecipeDetails } from '@/types/api';

interface AddToCartDrawerProps {
  recipe: RecipeDetails;
}

function AddToCartDrawer({ recipe }: AddToCartDrawerProps) {
  const { form, onSubmit, isPending } = useIngredientsForm({ recipe });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  async function handleSubmit(values: FormValues) {
    await onSubmit(values, quantity).finally(() => setIsDrawerOpen(false));
  }

  return (
    <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <DrawerTrigger onClick={() => setIsDrawerOpen(true)} asChild>
        <HeaderIconButton Icon={<CirclePlus className='w-5 h-5' />} />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DrawerHeader>

        <div className='mx-auto w-full px-6'>
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
        </div>

        <DrawerFooter className='flex flex-row w-full'>
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
