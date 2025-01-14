'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ingredientQueries } from '@/src/entities/ingredient';
import { FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import Search from '@/src/shared/ui/search';

import type { FormValues } from '../../model/schema';
import type { UseFormReturn } from 'react-hook-form';

interface IngredientsSelectProps {
  form: UseFormReturn<FormValues>;
  fieldIndex: number;
  initialValue: string;
}

function IngredientsSelect({ form, fieldIndex, initialValue }: IngredientsSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const t = useTranslations('RecipeFormPage.Form.Fields');

  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const { data: ingredients } = useQuery(ingredientQueries.search(debouncedSearchTerm));

  function handleSearch(nextValue: string, onChange: (v: string) => void) {
    onChange(nextValue);
    setSearchTerm(nextValue);
  }

  function handleValueSelect(nextValue: string, onChange: (v: string) => void) {
    onChange(nextValue);
    setOpen(false);
  }

  return (
    <FormField
      control={form.control}
      name={`ingredients.${fieldIndex}.name`}
      render={({ field }) => (
        <FormItem className='flex flex-col min-w-0 basis-2/3'>
          <Search
            placeholder={t('ingredientNamePlaceholder')}
            data={ingredients ?? []}
            searchTerm={field.value}
            setSearchTerm={nextValue => handleSearch(nextValue, field.onChange)}
            setSelected={nextValue => handleValueSelect(nextValue, field.onChange)}
            open={open}
            setOpen={setOpen}
            showSearch={false}
            showClear={false}
            allowFocus
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { IngredientsSelect };
