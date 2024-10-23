'use client';

import { Bookmark } from 'lucide-react';

import useSaveRecipeToggle from '@/hooks/useSaveRecipeToggle';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';

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
