import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@/src/shared/lib/classnames';

import { Button } from './button';

interface NumberInputSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  onValueChange: (nextValue: number) => void;
}

const NumberInputSpinner = React.forwardRef<HTMLDivElement, NumberInputSpinnerProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const t = useTranslations('InputSpinner');

    return (
      <div ref={ref} className={cn('flex flex-row rounded-lg border w-fit', className)} {...props}>
        <Button
          variant='ghost'
          size='xs'
          className='w-9 h-8 p-0 rounded-r-none rounded-l-lg'
          onClick={() => onValueChange(value - 1)}
          disabled={value === 1}
          aria-label={t('decreaseValue')}
        >
          <Minus className='w-5 h-5' />
        </Button>

        <div className='flex justify-center items-center h-8 w-7'>
          <span className='text-base'>{value}</span>
        </div>

        <Button
          variant='ghost'
          size='xs'
          className='w-9 h-8 p-0 rounded-l-none rounded-r-lg'
          onClick={() => onValueChange(value + 1)}
          aria-label={t('increaseValue')}
        >
          <Plus className='w-5 h-5' />
        </Button>
      </div>
    );
  },
);

NumberInputSpinner.displayName = 'NumberInputSpinner';

export { NumberInputSpinner };
