import { cva, VariantProps } from 'class-variance-authority';
import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button } from './button';

interface NumberInputSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  onValueChange: (nextValue: number) => void;
}

const NumberInputSpinner = React.forwardRef<HTMLDivElement, NumberInputSpinnerProps>(
  ({ className, value, onValueChange, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-row rounded-lg border w-fit', className)} {...props}>
      <Button
        variant='ghost'
        size='xs'
        className='w-8 h-7 p-0 rounded-r-none rounded-l-lg'
        onClick={() => onValueChange(value - 1)}
        disabled={value === 0}
      >
        <Minus className='w-4 h-4' />
      </Button>

      <div className='flex justify-center items-center h-7 w-8'>
        <span className='text-sm'>{value}</span>
      </div>

      <Button
        variant='ghost'
        size='xs'
        className='w-8 h-7 p-0 rounded-l-none rounded-r-lg'
        onClick={() => onValueChange(value + 1)}
      >
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  ),
);

NumberInputSpinner.displayName = 'NumberInputSpinner';

export { NumberInputSpinner };
