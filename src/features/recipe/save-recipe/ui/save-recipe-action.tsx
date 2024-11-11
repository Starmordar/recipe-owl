'use client';

import { Bookmark } from 'lucide-react';

import { RequireAuthDrawer } from '@/src/entities/session';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { useSaveRecipe } from '../lib/use-save-recipe';

interface SaveRecipeActionProps {
  userId: string | undefined;
  recipeId: number;
  isSaved: boolean;
}

function SaveRecipeAction({ isSaved, userId, recipeId }: SaveRecipeActionProps) {
  const { isSavedOptimistic, handleSaveRecipe } = useSaveRecipe({ recipeId, userId, isSaved });

  if (!userId) {
    return (
      <RequireAuthDrawer
        title='Log In to Save'
        description='To save your recipes, please log in or create a new account.'
      >
        <HeaderIconButton Icon={<Bookmark />} />
      </RequireAuthDrawer>
    );
  }

  const iconOptions = isSavedOptimistic ? { fill: '#000000' } : {};
  return <HeaderIconButton Icon={<Bookmark {...iconOptions} />} onClick={handleSaveRecipe} />;
}

export { SaveRecipeAction };
