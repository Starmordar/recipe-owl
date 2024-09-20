'use client';

import { Button } from '@/components/ui/button';
import { NumberInputSpinner } from '@/components/ui/number-input-spinner';

import type { FormValues } from '../constants/schema';
import type { RecipeDetails } from '@/types/api';
import type { UseFormReturn } from 'react-hook-form';

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
    <div className='flex flex-col gap-y-4 px-6'>
      <div className='flex items-center justify-between gap-x-2'>
        <span className='font-semibold truncate '>{recipe.title}</span>
        <NumberInputSpinner value={quantity} onValueChange={setQuantity} />
      </div>

      <div className='flex items-center justify-between mb-2 text-sm'>
        <p className='opacity-70'>Items to Add</p>

        <Button
          className='px-0 opacity-70 hover:bg-transparent hover:text-current'
          variant='ghost'
          size='xss'
          onClick={showDeselect ? handleDeselect : handleSelectAll}
        >
          {showDeselect ? ' Deselect All' : 'Select All'}
        </Button>
      </div>
    </div>
  );
}

export default IngredientsFormHeader;
