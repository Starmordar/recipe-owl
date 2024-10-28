'use client';

import type { FormValues } from '@/src/components/recipe-details-form/constants/shema';
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Textarea } from '@/src/shared/ui/textarea';

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
              placeholder='e.g., Mix ingredients in a bowl'
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

export default StepField;
