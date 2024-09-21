'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface RemoveIngredientProps {
  isPending: boolean;
  onRemove: () => void;
}

function RemoveIngredient({ onRemove, isPending }: RemoveIngredientProps) {
  return (
    <Button
      className='px-1'
      variant='ghost'
      size='icon-xs'
      onClick={onRemove}
      loading={isPending}
      loadingText=''
      loadingClassName='h-5 w-5'
    >
      <X className='h-5 w-5' />
    </Button>
  );
}

export default RemoveIngredient;
