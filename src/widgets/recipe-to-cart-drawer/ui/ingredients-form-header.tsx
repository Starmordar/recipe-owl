'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/src/shared/ui/button';
import { NumberInputSpinner } from '@/src/shared/ui/number-input-spinner';

import type { FormValues } from '../model/schema';
import type { RecipeDetails } from '@/src/entities/recipe';
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
  const t = useTranslations('RecipeDetailsPage.AddToCartDrawer');

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
        <span className='font-semibold truncate text-lg'>{recipe.title}</span>
        <NumberInputSpinner value={quantity} onValueChange={setQuantity} />
      </div>

      <div className='flex items-center justify-between mb-3 text-base'>
        <p className='opacity-70'>{t('itemsToAddLabel')}</p>

        <Button
          className='px-0 opacity-70 hover:bg-transparent hover:text-current text-base'
          variant='ghost'
          size='xs'
          onClick={showDeselect ? handleDeselect : handleSelectAll}
        >
          {showDeselect ? t('itemsDeselectAllAction') : t('itemsSelectAllAction')}
        </Button>
      </div>
    </div>
  );
}

export { IngredientsFormHeader };
