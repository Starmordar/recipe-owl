import { startTransition, useOptimistic } from 'react';

import { saveRecipe, unsaveRecipe } from '@/app/(main)/recipes/actions';

interface UseSaveRecipeToggleProps {
  recipeId: number;
  userId?: string;
  isSaved: boolean;
}

function useSaveRecipeToggle({ recipeId, userId, isSaved }: UseSaveRecipeToggleProps) {
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

export default useSaveRecipeToggle;
