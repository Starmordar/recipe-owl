'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Textarea } from '@/src/shared/ui/textarea';

import type { FormValues } from '../../model/schema';
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

interface StepFieldProps {
  form: UseFormReturn<FormValues>;
  field: FieldArrayWithId<FormValues, 'steps', 'id'>;
  index: number;
}

function StepField({ form, field, index }: StepFieldProps) {
  return (
    <FormField
      control={form.control}
      name={`steps.${index}.description`}
      render={({ field }) => (
        <FormItem className='flex-1'>
          <FormControl>
            <Textarea
              placeholder='Describe each step of your recipe in detail. Include tips, techniques, etc...'
              className='min-h-[40px] resize-none'
              autoResize
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { StepField };
