import { startTransition, useOptimistic } from 'react';

import { saveRecipe } from '../api/save-recipe';
import { unsaveRecipe } from '../api/unsave-recipe';

interface UseSaveRecipeOptions {
  recipeId: number;
  isSaved: boolean;
}

function useSaveRecipe({ recipeId, isSaved }: UseSaveRecipeOptions) {
  const [isSavedOptimistic, setIsSavedOptimistic] = useOptimistic(isSaved);

  async function handleSaveRecipe() {
    startTransition(() => setIsSavedOptimistic(prevData => !prevData));

    const handleSaveOrRemove = isSavedOptimistic ? unsaveRecipe : saveRecipe;
    handleSaveOrRemove(recipeId).catch(() =>
      startTransition(() => setIsSavedOptimistic(prev => prev)),
    );
  }

  return { handleSaveRecipe, isSavedOptimistic };
}

export { useSaveRecipe };
