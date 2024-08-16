'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getIngredients } from '@/lib/data';
import { cn } from '@/lib/utils';

import type { FormValues } from '../constants/shema';
import type { UseFormReturn } from 'react-hook-form';

interface IngredientsSelectProps {
  form: UseFormReturn<FormValues>;
  fieldIndex: number;
}

export function IngredientsSelect({ form, fieldIndex }: IngredientsSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  const { data: ingredients } = useQuery({
    queryKey: ['ingredients', debouncedSearchTerm],
    queryFn: () => getIngredients(debouncedSearchTerm),
    placeholderData: prev => prev,
  });

  function handleValueSelect(
    currentValue: string,
    nextValue: string,
    onChange: (v: string) => void,
  ) {
    onChange(nextValue === currentValue ? '' : nextValue);
    handleOpenChange(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setSearchTerm('');
    setOpen(nextOpen);
  }

  const addPlaceholder = searchTerm.length > 8 ? `${searchTerm.slice(0, 8)}...` : searchTerm;

  return (
    <FormField
      control={form.control}
      name={`ingredients.${fieldIndex}.name`}
      render={({ field }) => (
        <FormItem className='flex flex-col min-w-0 basis-2/3'>
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className={cn(
                    'w-full px-3 justify-start',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  <span className='truncate'>{field.value || 'Select ingredient...'}</span>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
              <Command shouldFilter={false}>
                <CommandInput
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  placeholder='Search...'
                  className='h-9'
                  showClear={false}
                  onClear={() => {}}
                />

                <CommandList>
                  <CommandEmpty>
                    <Button
                      variant='outline'
                      onClick={() => {
                        handleValueSelect(field.value, searchTerm, field.onChange);
                      }}
                    >
                      Add &quot;{addPlaceholder}&quot; <Plus className='ml-2 w-4 h-4' />
                    </Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {ingredients?.map(({ name }) => (
                      <CommandItem
                        key={name}
                        value={name}
                        onSelect={nextValue => {
                          handleValueSelect(field.value, nextValue, field.onChange);
                        }}
                      >
                        {name}
                        <Check
                          className={cn(
                            'ml-auto h-4 w-4',
                            field.value === name ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
