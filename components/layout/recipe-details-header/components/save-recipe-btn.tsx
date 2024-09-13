'use client';

import { Heart } from 'lucide-react';

import { removeSavedRecipe, saveRecipe } from '@/app/(main)/recipes/actions';
import { Button } from '@/components/ui/button';

interface SaveRecipeBtnProps {
  isSaved: boolean;
  userId: string | undefined;
  recipeId: number;
}

function SaveRecipeBtn({ isSaved, userId, recipeId }: SaveRecipeBtnProps) {
  async function handleDeleteRecipe() {
    if (!userId) return;

    if (isSaved) await removeSavedRecipe(userId, recipeId);
    else await saveRecipe(userId, recipeId);
  }

  const iconOptions = isSaved ? { fill: '#FF4C4C', stroke: '#FF4C4C' } : {};

  return (
    <Button size='xss' variant='ghost' className='px-0'>
      <Heart onClick={handleDeleteRecipe} className='h-5 w-5' {...iconOptions} />
    </Button>
  );
}

export default SaveRecipeBtn;
