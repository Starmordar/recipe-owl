'use client';

import { Bookmark } from 'lucide-react';

import { cn } from '@/src/shared/lib/classnames';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { sparkAngles, useSaveAnimation } from '../lib/use-save-animation';
import { useSaveRecipe } from '../lib/use-save-recipe';

interface SaveButtonProps {
  recipeId: number;
  isSaved: boolean;
}

function SaveButton({ isSaved, recipeId }: SaveButtonProps) {
  const { isSavedOptimistic, handleSaveRecipe } = useSaveRecipe({ recipeId, isSaved });
  const { iconRef, ringRef, setSparkRef, playAnimation } = useSaveAnimation();

  function handleClick() {
    playAnimation(!isSavedOptimistic);
    handleSaveRecipe();
  }

  return (
    <HeaderIconButton
      Icon={<Bookmark ref={iconRef} fill={isSavedOptimistic ? 'currentColor' : 'none'} />}
      onClick={handleClick}
      aria-pressed={isSavedOptimistic}
    >
      <span className='absolute inset-0 pointer-events-none' aria-hidden='true'>
        <span
          ref={ringRef}
          className='absolute inset-0 rounded-full border-2 border-primary opacity-0'
        />

        {sparkAngles.map((angle, index) => (
          <span
            key={angle}
            ref={setSparkRef(index)}
            className={cn(
              'absolute top-1/2 left-1/2 -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full opacity-0',
              index % 2 === 0 ? 'bg-primary' : 'bg-lime-500',
            )}
          />
        ))}
      </span>
    </HeaderIconButton>
  );
}

export { SaveButton };
