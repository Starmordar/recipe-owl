'use client';

import { useTranslations } from 'next-intl';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/shared/ui/form';
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
  const t = useTranslations('RecipeFormPage.Form.Fields');

  return (
    <fieldset className='flex flex-col gap-y-4'>
      <ImageField form={form} />

      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem className='space-y-1'>
            <FormLabel className='text-lg'>{t('title')}</FormLabel>
            <FormControl>
              <Input placeholder={t('titlePlaceholder')} {...field} />
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
            <FormLabel>{t('description')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('descriptionPlaceholder')}
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
            <FormLabel>{t('source')}</FormLabel>
            <FormControl>
              <Input placeholder={t('sourcePlaceholder')} {...field} />
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
            <FormLabel>{t('cookTime')}</FormLabel>
            <FormControl>
              <CookTimeDrawer onChange={field.onChange} value={field.value}>
                <Input placeholder={t('cookTimePlaceholder')} type='text' readOnly {...field} />
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
