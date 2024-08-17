'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import IngredientsSelect from './ingredients-select';

import type { FormValues } from '../constants/shema';

interface IngredientsFieldsetProps {
  form: UseFormReturn<FormValues>;
}

function IngredientsFieldset({ form }: IngredientsFieldsetProps) {
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control: form.control,
  });

  function handleRemoveField(index: number) {
    if (fields.length < 2) return;
    remove(index);
  }

  return (
    <fieldset className='flex flex-col gap-y-4'>
      <legend className='text-lg font-medium mb-2'>Ingredients</legend>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className='flex'>
            <div className='flex flex-1 gap-x-2'>
              <IngredientsSelect form={form} fieldIndex={index} />

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

            <Button
              className='rounded-full'
              variant='ghost'
              size='icon'
              type='button'
              disabled={fields.length < 2}
              onClick={() => {
                handleRemoveField(index);
              }}
            >
              <Trash2 className='h-4 w-4 opacity-50' />
            </Button>
          </div>
        );
      })}

      <div className='flex justify-center'>
        <Button
          variant='ghost'
          type='button'
          onClick={() => {
            append({ name: '', unit: '' });
          }}
        >
          <Plus className='h-5 w-5 opacity-80 mr-2' />
          Ingredient
        </Button>
      </div>
    </fieldset>
  );
}

export default IngredientsFieldset;
