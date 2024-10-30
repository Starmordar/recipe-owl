import { startTransition, useOptimistic } from 'react';

import { saveRecipe } from '../api/save-recipe';
import { unsaveRecipe } from '../api/unsave-recipe';

interface UseSaveRecipeOptions {
  userId: string | undefined;
  recipeId: number;
  isSaved: boolean;
}

function useSaveRecipe({ recipeId, userId, isSaved }: UseSaveRecipeOptions) {
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
