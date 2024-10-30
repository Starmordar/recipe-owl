'use client';

import { Bookmark } from 'lucide-react';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { useSaveRecipe } from '../lib/use-save-recipe';

interface SaveRecipeActionProps {
  userId: string | undefined;
  recipeId: number;
  isSaved: boolean;
}

function SaveRecipeAction({ isSaved, userId, recipeId }: SaveRecipeActionProps) {
  const { isSavedOptimistic, handleSaveRecipe } = useSaveRecipe({ recipeId, userId, isSaved });

  const iconOptions = isSavedOptimistic ? { fill: '#000000' } : {};
  return <HeaderIconButton Icon={<Bookmark {...iconOptions} />} onClick={handleSaveRecipe} />;
}

export { SaveRecipeAction };
