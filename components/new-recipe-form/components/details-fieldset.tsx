'use client';

import { z } from 'zod';
import { type UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import schema from '../shema';

interface DetailsFieldsetProps {
  form: UseFormReturn<z.infer<typeof schema>>;
}

export default function DetailsFieldset({ form }: DetailsFieldsetProps) {
  return (
    <fieldset className="flex flex-col gap-y-4">
      <FormField
        control={form.control}
        name="image"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormControl>
              <Input
                {...fieldProps}
                placeholder="Recipe Image"
                type="file"
                accept="image/*"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Title: My best-ever Mochi" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Tell us a little bit about this dish"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
  );
}
