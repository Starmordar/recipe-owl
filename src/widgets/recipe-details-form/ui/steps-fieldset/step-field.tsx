'use client';

import { useTranslations } from 'next-intl';

import { FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { Textarea } from '@/src/shared/ui/textarea';

import type { FormValues } from '../../model/schema';
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

interface StepFieldProps {
  form: UseFormReturn<FormValues>;
  field: FieldArrayWithId<FormValues, 'steps', 'id'>;
  index: number;
}

function StepField({ form, field, index }: StepFieldProps) {
  const t = useTranslations('RecipeFormPage.Form.Fields');

  return (
    <div className='flex flex-1 items-start gap-x-2'>
      <span className='mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200'>
        {index + 1}
      </span>

      <FormField
        control={form.control}
        name={`steps.${index}.description`}
        render={({ field }) => (
          <FormItem className='min-w-0 flex-1'>
            <FormControl>
              <Textarea
                placeholder={t('stepPlaceholder')}
                className='min-h-[40px] resize-none text-base'
                autoResize
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export { StepField };
