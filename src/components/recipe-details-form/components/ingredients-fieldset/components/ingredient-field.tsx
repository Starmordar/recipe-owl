'use client';

import { UseFormReturn } from 'react-hook-form';

import { FormValues } from '@/src/components/recipe-details-form/constants/shema';

import IngredientsSelect from './ingredients-select';

import { FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';

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

export default IngredientField;
