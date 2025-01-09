'use client';

import { ArrowLeft, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useMemo, useRef, useState } from 'react';

import { publicUrls } from '@/src/shared/config/url';
import { Button } from '@/src/shared/ui/button';

import { SearchSuggestions } from './search-suggestions';

interface SearchInputProps {
  suggestions: Array<string>;
  hasSelectedFilters: boolean;
  searchTerm: string;
  selectedValue: string;
  setSelected: (value: string) => void;
  setSearchTerm: (value: string) => void;
}

function SearchInput({
  suggestions,
  hasSelectedFilters,
  searchTerm,
  selectedValue,
  setSearchTerm,
  setSelected,
}: SearchInputProps) {
  const t = useTranslations('RecipeFilters.Search');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focusInput, setFocusInput] = useState(false);

  const showClear = useMemo(() => {
    const hasSearch = !focusInput && selectedValue !== '';
    return hasSelectedFilters || hasSearch;
  }, [focusInput, selectedValue, hasSelectedFilters]);

  function clearSelectedValues() {
    setSearchTerm('');
    setSelected('');
    inputRef.current?.focus();
  }

  function cancelSearch() {
    setSearchTerm(selectedValue);
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement> | undefined) {
    if (evt?.key !== 'Enter') return;

    evt.preventDefault();
    setSearchTerm(searchTerm);
    setSelected(searchTerm);
    inputRef.current?.blur();
  }

  return (
    <div className='flex w-full items-center gap-x-2'>
      {showClear && (
        <Link href={publicUrls.recipes} aria-label={t('clear')} onMouseDown={clearSelectedValues}>
          <ArrowLeft />
        </Link>
      )}

      <div className='flex items-center border border-input bg-background rounded-3xl space-x-3 px-3 w-full focus-within:ring-2 focus-within:ring-ring'>
        <Search className='opacity-50' />

        <input
          ref={inputRef}
          className='flex h-10 w-full bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground hide-search-actions'
          type='search'
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={evt => setSearchTerm(evt.target.value)}
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          onKeyDown={handleKeyDown}
        />

        {searchTerm && (
          <X
            className='cursor-pointer opacity-50'
            onMouseDown={evt => {
              evt.preventDefault();
              clearSelectedValues();
            }}
          />
        )}
      </div>

      {focusInput && (
        <Button
          className='text-primary text-base px-1'
          variant='ghost'
          size='xss'
          onMouseDown={cancelSearch}
        >
          {t('cancel')}
        </Button>
      )}

      {focusInput && (
        <SearchSuggestions
          suggestions={suggestions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelected={setSelected}
          heights={{ top: 55, bottom: 45 }}
        />
      )}
    </div>
  );
}

export { SearchInput };
