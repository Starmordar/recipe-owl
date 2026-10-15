'use client';

import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { Textarea } from '@/src/shared/ui/textarea';

import { CookTimeDrawer } from './cook-time-drawer';
import { ImageField } from './image-field';
import { OptionalHint } from './optional-hint';
import { TagsField } from './tags-field';

import type { FormValues } from '../../model/schema';
import type { UseFormReturn } from 'react-hook-form';

interface DetailsFieldsetProps {
  form: UseFormReturn<FormValues>;
}

function DetailsFieldset({ form }: DetailsFieldsetProps) {
  const t = useTranslations('RecipeFormPage.Form.Fields');

  return (
    <fieldset className='flex flex-col gap-y-4 lg:col-span-2 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10'>
      <ImageField form={form} />

      <div className='flex flex-col gap-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('title')}</FormLabel>
              <FormControl>
                <Input className='text-base' placeholder={t('titlePlaceholder')} {...field} />
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
              <FormLabel>
                {t('description')} <OptionalHint />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('descriptionPlaceholder')}
                  className='resize-none text-base'
                  autoResize
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-y-4 lg:grid lg:grid-cols-2 lg:gap-x-4'>
          <FormField
            control={form.control}
            name='cookTime'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>
                  {t('cookTime')} <OptionalHint />
                </FormLabel>
                <div className='relative'>
                  <CookTimeDrawer onChange={field.onChange} value={field.value}>
                    <FormControl>
                      <Input
                        className='pl-9 text-base'
                        placeholder={t('cookTimePlaceholder')}
                        type='text'
                        readOnly
                        {...field}
                      />
                    </FormControl>
                  </CookTimeDrawer>
                  <Clock
                    className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                    aria-hidden='true'
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='source'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>
                  {t('source')} <OptionalHint />
                </FormLabel>
                <FormControl>
                  <Input className='text-base' placeholder={t('sourcePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <TagsField form={form} />
      </div>
    </fieldset>
  );
}

export { DetailsFieldset };
