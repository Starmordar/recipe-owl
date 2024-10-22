'use client';

import { UseFormReturn } from 'react-hook-form';

import { FormValues } from '@/components/recipe-details-form/constants/shema';
import { FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import IngredientsSelect from './ingredients-select';

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
