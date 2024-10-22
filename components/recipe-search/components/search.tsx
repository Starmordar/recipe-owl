'use client';

import React from 'react';

import { Command, CommandList, CommandInput } from '@/shared/ui/command';

interface SearchProps {
  placeholder: string;

  searchTerm: string;
  selectedValue: string;
  setSelected: (value: string) => void;
  setSearchTerm: (value: string) => void;

  showSearch?: boolean;
  showClear?: boolean;
}

function Search({
  placeholder,
  searchTerm,
  selectedValue,
  setSearchTerm,
  setSelected,
  showSearch,
  showClear,
}: SearchProps) {
  function handleValueChange(value: string) {
    setSearchTerm(value);
  }

  function handleClear() {
    setSearchTerm('');
    setSelected('');
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement> | undefined) {
    if (evt?.key === 'Enter') {
      evt.preventDefault();
      setSearchTerm(searchTerm);
      setSelected(searchTerm);
    }
  }

  return (
    <React.Fragment>
      <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
        <CommandInput
          placeholder={placeholder}
          value={searchTerm}
          onValueChange={handleValueChange}
          showClear={showClear ?? !!searchTerm}
          onClear={handleClear}
          showSearch={showSearch ?? true}
          onBlur={() => handleValueChange(selectedValue)}
        />
        <CommandList></CommandList>
      </Command>
    </React.Fragment>
  );
}

export default Search;
