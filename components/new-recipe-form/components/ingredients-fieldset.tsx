'use client';

import { z } from 'zod';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import schema from '../shema';

interface IngredientsFieldsetProps {
  form: UseFormReturn<z.infer<typeof schema>>;
}

export default function IngredientsFieldset({ form }: IngredientsFieldsetProps) {
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control: form.control,
  });

  function handleRemove(index: number) {
    if (fields.length < 2) return;
    remove(index);
  }

  return (
    <fieldset className="flex flex-col gap-y-4">
      <legend className="text-lg font-medium mb-2">Ingredients</legend>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex">
            {/* <Button className="rounded-full" variant="ghost" size="icon">
              <GripVertical className="h-4 w-4 opacity-50" />
            </Button> */}

            <div className="flex gap-x-2">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Quantity" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="rounded-full"
              variant="ghost"
              size="icon"
              type="button"
              disabled={fields.length < 2}
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="h-4 w-4 opacity-50" />
            </Button>
          </div>
        );
      })}

      <div className="flex justify-center">
        <Button variant="ghost" type="button" onClick={() => append({ name: '', quantity: '' })}>
          <Plus className="h-5 w-5 opacity-80 mr-2" />
          Ingredient
        </Button>
      </div>
    </fieldset>
  );
}
