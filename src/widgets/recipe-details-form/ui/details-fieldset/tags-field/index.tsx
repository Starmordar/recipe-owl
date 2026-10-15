import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/shared/ui/form';

import { OptionalHint } from '../optional-hint';

import { TagsDrawer } from './drawer';

import type { FormValues } from '../../../model/schema';
import type { UseFormReturn } from 'react-hook-form';

interface TagsFieldProps {
  form: UseFormReturn<FormValues>;
}

function TagsField({ form }: TagsFieldProps) {
  const t = useTranslations();

  return (
    <FormField
      control={form.control}
      name='tags'
      render={({ field }) => (
        <FormItem className='space-y-2'>
          <div className='flex items-baseline justify-between gap-x-4'>
            <FormLabel>
              {t('RecipeFormPage.Form.Fields.tags')} <OptionalHint />
            </FormLabel>

            <TagsDrawer value={field.value} onChange={field.onChange}>
              <button
                type='button'
                className='shrink-0 -my-2 py-2 text-sm font-medium text-primary'
              >
                {t('RecipeFormPage.Form.Fields.tagsAction')}
              </button>
            </TagsDrawer>
          </div>

          {field.value.length === 0 && (
            <p className='text-sm text-muted-foreground'>
              {t('RecipeFormPage.Form.Fields.tagsPlaceholder')}
            </p>
          )}

          {field.value.length > 0 && (
            <FormControl>
              <ul className='flex flex-wrap gap-2'>
                {field.value.map(option => (
                  <li key={option}>
                    <button
                      type='button'
                      className='flex items-center gap-x-1 py-1 pl-3 pr-2 rounded-full text-sm bg-[#EAF3DE] text-[#27500A]'
                      aria-label={t('RecipeFormPage.Form.Fields.removeTagAction', {
                        tag: t(`RecipeTags.Items.${option}`),
                      })}
                      onClick={() => field.onChange(field.value.filter(value => value !== option))}
                    >
                      {t(`RecipeTags.Items.${option}`)}
                      <X className='h-3.5 w-3.5' aria-hidden='true' />
                    </button>
                  </li>
                ))}
              </ul>
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { TagsField };
