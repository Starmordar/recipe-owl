'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { Textarea } from '@/src/shared/ui/textarea';

import { CookTimeDrawer } from './cook-time-drawer';
import { ImageField } from './image-field';
import { TagsField } from './tags-field';

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
          <FormItem className='space-y-1'>
            <FormLabel className='text-lg'>Title</FormLabel>
            <FormControl>
              <Input placeholder='Give your recipe a name' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem className='space-y-1'>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Introduce your recipe, add notes, cooking tips, serving suggestions, etc...'
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
          <FormItem className='space-y-1'>
            <FormLabel>Source</FormLabel>
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
          <FormItem className='space-y-1'>
            <FormLabel>Cook Time</FormLabel>
            <FormControl>
              <CookTimeDrawer onChange={field.onChange} value={field.value}>
                <Input
                  placeholder='How long does it take to cook this recipe?'
                  type='text'
                  readOnly
                  {...field}
                />
              </CookTimeDrawer>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <TagsField form={form} />
    </fieldset>
  );
}

export { DetailsFieldset };
