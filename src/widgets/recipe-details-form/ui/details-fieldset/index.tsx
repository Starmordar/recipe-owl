'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { Textarea } from '@/src/shared/ui/textarea';

import { CookTimeDrawer } from './cook-time-drawer';
import { ImageField } from './image-field';

import type { FormValues } from '../../model/schema';
import type { UseFormReturn } from 'react-hook-form';

interface DetailsFieldsetProps {
  form: UseFormReturn<FormValues>;
}

function DetailsFieldset({ form }: DetailsFieldsetProps) {
  return (
    <fieldset className='flex flex-col gap-y-4'>
      <ImageField form={form} />

      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder='e.g., Ultimate Chocolate Chip Cookies' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder='Share a bit more about the origin or inspiration behind this dish.'
                className='resize-none'
                autoResize
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='source'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder='Source or link to the original recipe' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='cookTime'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CookTimeDrawer onChange={field.onChange} value={field.value}>
                <Input placeholder='Cook Time' {...field} />
              </CookTimeDrawer>
            </FormControl>
            <FormDescription>How long does it take to cook this recipe?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
  );
}

export { DetailsFieldset };
