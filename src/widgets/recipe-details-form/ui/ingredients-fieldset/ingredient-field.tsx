'use client';

import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';

import { IngredientsSelect } from './ingredients-select';

import type { FormValues } from '../../model/shema';

interface IngredientFieldProps {
  form: UseFormReturn<FormValues>;
  field: FormValues['ingredients'][number];
  index: number;
}

function IngredientField({ form, field, index }: IngredientFieldProps) {
  return (
    <div className='flex flex-1 gap-x-2'>
      <IngredientsSelect form={form} fieldIndex={index} initialValue={field.name} />

      <FormField
        control={form.control}
        name={`ingredients.${index}.unit`}
        render={({ field }) => (
          <FormItem className='basis-1/3'>
            <FormControl>
              <Input placeholder='Quantity' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export { IngredientField };
