'use client';

import { z } from 'zod';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import schema from '../shema';

interface StepsFieldsetProps {
  form: UseFormReturn<z.infer<typeof schema>>;
}

export default function StepsFieldset({ form }: StepsFieldsetProps) {
  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control: form.control,
  });

  function handleRemove(index: number) {
    if (fields.length < 2) return;
    remove(index);
  }

  return (
    <fieldset className="flex flex-col gap-y-4">
      <legend className="text-lg font-medium mb-2">Method</legend>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex">
            <FormField
              control={form.control}
              name={`steps.${index}.description`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea placeholder="Mix..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        <Button variant="ghost" type="button" onClick={() => append({ description: '' })}>
          <Plus className="h-5 w-5 opacity-80 mr-2" />
          Step
        </Button>
      </div>
    </fieldset>
  );
}
