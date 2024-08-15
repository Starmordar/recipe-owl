'use client';

import ImageUploadField from './image-upload-field';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import { type FormValues } from '../constants/shema';
import type { UseFormReturn } from 'react-hook-form';

interface DetailsFieldsetProps {
  form: UseFormReturn<FormValues>;
}

function DetailsFieldset({ form }: DetailsFieldsetProps) {
  return (
    <fieldset className="flex flex-col gap-y-4">
      <ImageUploadField form={form} />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Title: My best-ever Quiche Pie" {...field} />
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
                placeholder="Share a little more about this dist."
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

export default DetailsFieldset;
