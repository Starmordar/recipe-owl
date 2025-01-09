import { useTranslations } from 'next-intl';

import { Button } from '@/src/shared/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/shared/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/ui/toggle-group';

import { TagsDrawer } from './drawer';

import type { FormValues } from '../../../model/schema';
import type { UseFormReturn } from 'react-hook-form';

interface TagsFieldProps {
  form: UseFormReturn<FormValues>;
}

function TagsField({ form }: TagsFieldProps) {
  const t = useTranslations('RecipeFormPage.Form.Fields');

  return (
    <FormField
      control={form.control}
      name='tags'
      render={({ field }) => (
        <FormItem className='space-y-1'>
          <div className='flex justify-between items-center'>
            <FormLabel>{t('tags')}</FormLabel>

            <TagsDrawer value={field.value} onChange={field.onChange}>
              <Button variant='ghost' className='text-primary text-base font-semibold px-0'>
                {t('tagsAction')}
              </Button>
            </TagsDrawer>
          </div>

          {field.value.length === 0 && <p>{t('tagsPlaceholder')}</p>}

          <FormControl>
            <ToggleGroup
              value={field.value}
              onValueChange={field.onChange}
              type='multiple'
              variant='outline'
              className='flex flex-wrap justify-start gap-2'
            >
              {field.value.map(option => (
                <ToggleGroupItem
                  key={option}
                  value={option}
                  size='sm'
                  className='data-[state=on]:border-primary'
                >
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { TagsField };
