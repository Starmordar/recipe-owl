'use client';

import { Bookmark } from 'lucide-react';
import { useOptimistic } from 'react';

import { removeSavedRecipe, saveRecipe } from '@/app/(main)/recipes/actions';
import { Button } from '@/components/ui/button';

import HeaderIconButton from '../../app-header/components/icon-button';

interface SaveRecipeBtnProps {
  isSaved: boolean;
  userId: string | undefined;
  recipeId: number;
}

function SaveRecipeBtn({ isSaved, userId, recipeId }: SaveRecipeBtnProps) {
  const [isSavedOptimistic, setIsSavedOptimistic] = useOptimistic(isSaved);

  async function handleSaveRecipe() {
    if (!userId) return;
    setIsSavedOptimistic(prevData => !prevData);

    const callback = isSavedOptimistic ? removeSavedRecipe : saveRecipe;
    await callback(userId, recipeId).catch(() => setIsSavedOptimistic(prev => prev));
  }

  const iconOptions = isSavedOptimistic ? { fill: '#000000' } : {};
  return <HeaderIconButton Icon={<Bookmark {...iconOptions} />} onClick={handleSaveRecipe} />;
}

export default SaveRecipeBtn;
