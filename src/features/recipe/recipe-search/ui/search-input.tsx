'use client';

import { ArrowLeft, Search, X } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { publicUrls } from '@/src/shared/config/url';
import { Button } from '@/src/shared/ui/button';

import { SearchSuggestions } from './search-suggestions';

interface SearchInputProps {
  placeholder: string;
  suggestions: Array<string>;

  searchTerm: string;
  selectedValue: string;
  setSelected: (value: string) => void;
  setSearchTerm: (value: string) => void;
}

function SearchInput({
  suggestions,
  searchTerm,
  selectedValue,
  setSearchTerm,
  setSelected,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }

  function handleClear() {
    setSearchTerm('');
    setSelected('');
    inputRef.current?.focus();
  }

  function handleCancel() {
    setSearchTerm(selectedValue);
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement> | undefined) {
    if (evt?.key === 'Enter') {
      evt.preventDefault();
      setSearchTerm(searchTerm);
      setSelected(searchTerm);
      inputRef.current?.blur();
    }
  }

  return (
    <div className='flex w-full items-center gap-x-2'>
      {!focus && selectedValue !== '' && (
        <Link href={publicUrls.recipes} aria-label='Clear Search' onMouseDown={handleClear} replace>
          <ArrowLeft className='h-5 w-5' />
        </Link>
      )}

      <div className='flex items-center border rounded-3xl px-3 w-full focus-within:ring-2 focus-within:ring-ring'>
        <Search className='mr-3 h-5 w-5 shrink-0 opacity-50' />

        <input
          ref={inputRef}
          className='flex h-10 w-full bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
          type='text'
          placeholder='Search Recipe OWL'
          value={searchTerm}
          onChange={evt => setSearchTerm(evt.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />

        {!!searchTerm && (
          <X
            className='ml-2 h-5 w-5 cursor-pointer shrink-0 opacity-50'
            onMouseDown={evt => {
              evt.preventDefault();
              handleClear();
            }}
          />
        )}
      </div>

      {focus && (
        <Button
          className='text-primary text-base px-1'
          variant='ghost'
          size='xss'
          onMouseDown={handleCancel}
        >
          Cancel
        </Button>
      )}

      {focus && (
        <RemoveScroll forwardProps>
          <div className='fixed top-[55px] inset-x-0 h-[calc(100svh-93px)] bg-card container overflow-y-auto z-10'>
            <SearchSuggestions
              suggestions={suggestions}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSelected={setSelected}
            />
          </div>
        </RemoveScroll>
      )}
    </div>
  );
}

export { SearchInput };
