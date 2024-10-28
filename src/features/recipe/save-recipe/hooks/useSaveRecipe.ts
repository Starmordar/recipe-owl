import { startTransition, useOptimistic } from 'react';

import { saveRecipe } from '../model/save-recipe';
import { unsaveRecipe } from '../model/unsave-recipe';

interface UseSaveRecipeProps {
  userId: string | undefined;
  recipeId: number;
  isSaved: boolean;
}

function useSaveRecipe({ recipeId, userId, isSaved }: UseSaveRecipeProps) {
  const [isSavedOptimistic, setIsSavedOptimistic] = useOptimistic(isSaved);

  async function handleSaveRecipe() {
    if (!userId) return;
    startTransition(() => setIsSavedOptimistic(prevData => !prevData));

    const handleSaveOrRemove = isSavedOptimistic ? unsaveRecipe : saveRecipe;
    handleSaveOrRemove(userId, recipeId).catch(() =>
      startTransition(() => setIsSavedOptimistic(prev => prev)),
    );
  }

  return { handleSaveRecipe, isSavedOptimistic };
}

export { useSaveRecipe };
