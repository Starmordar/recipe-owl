'use client';

import { z } from 'zod';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import schema from '../shema';
import { getIngredients } from '@/lib/data';

interface IngredientsFieldsetProps {
  form: UseFormReturn<z.infer<typeof schema>>;
}

export default function IngredientsFieldset({ form }: IngredientsFieldsetProps) {
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control: form.control,
  });

  const { data: ingredients } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => getIngredients(),
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
            <div className="flex gap-x-2">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ingredient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ingredients?.map((ingredient) => (
                          <SelectItem key={ingredient.name} value={ingredient.name}>
                            {ingredient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ingredients.${index}.unit`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
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
        <Button variant="ghost" type="button" onClick={() => append({ name: '', unit: '' })}>
          <Plus className="h-5 w-5 opacity-80 mr-2" />
          Ingredient
        </Button>
      </div>
    </fieldset>
  );
}
