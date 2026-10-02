'use client';

import { Bookmark } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/src/shared/ui/button';

import { useSaveAnimation } from '../lib/use-save-animation';
import { useSaveRecipe } from '../lib/use-save-recipe';

interface SaveLabeledButtonProps {
  recipeId: number;
  isSaved: boolean;
}

function SaveLabeledButton({ isSaved, recipeId }: SaveLabeledButtonProps) {
  const t = useTranslations('RecipeDetailsPage.Save');

  const { isSavedOptimistic, handleSaveRecipe } = useSaveRecipe({ recipeId, isSaved });
  const { iconRef, playAnimation } = useSaveAnimation();

  function handleClick() {
    playAnimation(false);
    handleSaveRecipe();
  }

  return (
    <Button
      className='w-full gap-x-2 px-3 text-base'
      variant='outline'
      size='lg'
      onClick={handleClick}
      aria-pressed={isSavedOptimistic}
    >
      <Bookmark
        ref={iconRef}
        className='h-5 w-5'
        fill={isSavedOptimistic ? 'currentColor' : 'none'}
      />
      {isSavedOptimistic ? t('saved') : t('save')}
    </Button>
  );
}

export { SaveLabeledButton };
