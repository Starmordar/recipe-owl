'use client';

import { Bookmark } from 'lucide-react';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { useSaveRecipe } from '../lib/use-save-recipe';

interface SaveButtonProps {
  recipeId: number;
  isSaved: boolean;
}

function SaveButton({ isSaved, recipeId }: SaveButtonProps) {
  const { isSavedOptimistic, handleSaveRecipe } = useSaveRecipe({ recipeId, isSaved });
  const iconOptions = isSavedOptimistic ? { fill: '#000000' } : {};

  return <HeaderIconButton Icon={<Bookmark {...iconOptions} />} onClick={handleSaveRecipe} />;
}

export { SaveButton };
