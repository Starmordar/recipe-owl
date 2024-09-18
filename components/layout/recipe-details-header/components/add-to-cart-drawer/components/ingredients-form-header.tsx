'use client';

import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { NumberInputSpinner } from '@/components/ui/number-input-spinner';

import type { FormValues } from '../constants/schema';
import type { RecipeDetails } from '@/types/api';

interface IngredientsFormHeaderProps {
  form: UseFormReturn<FormValues>;
  recipe: RecipeDetails;
  quantity: number;
  setQuantity: (value: number) => void;
}

function IngredientsFormHeader({
  form,
  recipe,
  quantity,
  setQuantity,
}: IngredientsFormHeaderProps) {
  const watchIngredients = form.watch('ingredients');
  const showDeselect = watchIngredients.length === recipe.ingredients.length;

  function handleDeselect() {
    form.setValue('ingredients', []);
  }

  function handleSelectAll() {
    form.resetField('ingredients');
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        {recipe.title}
        <NumberInputSpinner value={quantity} onValueChange={setQuantity} />
      </div>
      <div className='flex items-center justify-between mb-2 text-sm'>
        <p>Items to Add</p>

        <Button
          size='xss'
          variant='ghost'
          className='px-0'
          onClick={showDeselect ? handleDeselect : handleSelectAll}
        >
          {showDeselect ? ' Deselect All' : 'Select All'}
        </Button>
      </div>
    </div>
  );
}

export default IngredientsFormHeader;
