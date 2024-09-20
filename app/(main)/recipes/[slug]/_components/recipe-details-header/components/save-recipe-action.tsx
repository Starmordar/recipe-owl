'use client';

import { Bookmark } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import useSaveRecipeToggle from '@/hooks/useSaveRecipeToggle';

interface SaveRecipeActionProps {
  isSaved: boolean;
  userId: string | undefined;
  recipeId: number;
}

function SaveRecipeAction({ isSaved, userId, recipeId }: SaveRecipeActionProps) {
  const { isSavedOptimistic, handleSaveRecipe } = useSaveRecipeToggle({
    recipeId,
    userId,
    isSaved,
  });

  const iconOptions = isSavedOptimistic ? { fill: '#000000' } : {};
  return <HeaderIconButton Icon={<Bookmark {...iconOptions} />} onClick={handleSaveRecipe} />;
}

export default SaveRecipeAction;
