'use client';

import { CheckCheck, Shuffle } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SectionLegendsetProps {
  isDraggable: boolean;
  setIsDraggable: (value: boolean) => void;
}

function SectionLegend({ isDraggable, setIsDraggable }: SectionLegendsetProps) {
  return (
    <div className='flex justify-between'>
      <legend className='text-lg font-medium mb-2'>Ingredients</legend>

      <Button
        className='gap-x-2'
        size='xss'
        variant='outline'
        type='button'
        onClick={() => setIsDraggable(!isDraggable)}
      >
        {isDraggable ? (
          <>
            Done <CheckCheck className='h-4 w-4' />
          </>
        ) : (
          <>
            Reorder <Shuffle className='h-4 w-4' />
          </>
        )}
      </Button>
    </div>
  );
}

export default SectionLegend;
