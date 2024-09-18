'use client';

import { Bookmark } from 'lucide-react';
import { useOptimistic } from 'react';

import { removeSavedRecipe, saveRecipe } from '@/app/(main)/recipes/actions';
import { Button } from '@/components/ui/button';

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

  return (
    <Button className='relative rounded-full' variant='ghost' size='icon-xs'>
      <Bookmark onClick={handleSaveRecipe} className='h-5 w-5' {...iconOptions} />
    </Button>
  );
}

export default SaveRecipeBtn;
