'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import Search from '@/components/ui/search';
import { searchIngredients } from '@/lib/data/ingredients';

import type { FormValues } from '../constants/shema';
import type { UseFormReturn } from 'react-hook-form';

interface IngredientsSelectProps {
  form: UseFormReturn<FormValues>;
  fieldIndex: number;
  initialValue: string;
}

function IngredientsSelect({ form, fieldIndex, initialValue }: IngredientsSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  const { data: ingredients } = useQuery({
    queryKey: ['ingredients', debouncedSearchTerm],
    queryFn: () => searchIngredients(debouncedSearchTerm),
    placeholderData: prev => prev,
  });

  function handleSearch(nextValue: string, onChange: (v: string) => void) {
    onChange(nextValue);
    setSearchTerm(nextValue);
  }

  function handleValueSelect(
    currentValue: string,
    nextValue: string,
    onChange: (v: string) => void,
  ) {
    onChange(nextValue === currentValue ? '' : nextValue);
    setOpen(false);
  }

  return (
    <FormField
      control={form.control}
      name={`ingredients.${fieldIndex}.name`}
      render={({ field }) => (
        <FormItem className='flex flex-col min-w-0 basis-2/3'>
          <Search
            placeholder='Search for ingredients'
            data={ingredients ?? []}
            searchTerm={field.value}
            setSearchTerm={nextValue => handleSearch(nextValue, field.onChange)}
            setSelected={nextValue => handleValueSelect(field.value, nextValue, field.onChange)}
            open={open}
            setOpen={setOpen}
            showSearch={false}
            showClear={false}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default IngredientsSelect;
