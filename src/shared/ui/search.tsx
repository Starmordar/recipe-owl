'use client';

import React from 'react';

import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
} from '@/src/shared/ui/command';

interface SearchProps {
  placeholder: string;
  data: Array<{ id: number | string; title: string }>;

  open: boolean;
  setOpen: (value: boolean) => void;

  setSelected: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  showSearch?: boolean;
  showClear?: boolean;
  allowFocus?: boolean;
}

function Search({
  placeholder,
  searchTerm,
  setSearchTerm,
  setSelected,
  open,
  setOpen,
  data,
  showSearch,
  showClear,
  allowFocus,
}: SearchProps) {
  function handleValueChange(value: string) {
    setSearchTerm(value);
    setOpen(!!value);
  }

  function handleValueSelect(value: string) {
    setSearchTerm(value);
    setSelected(value);
    setOpen(false);
  }

  function handleClear() {
    setSearchTerm('');
    setSelected('');
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Command onKeyDown={() => {}} className='overflow-visible bg-transparent'>
        <CommandInput
          className='h-[2.35rem]'
          placeholder={placeholder}
          value={searchTerm}
          onValueChange={handleValueChange}
          onBlur={() => {
            setOpen(false);
          }}
          onFocus={() => {
            setOpen(true);
          }}
          showClear={showClear ?? !!searchTerm}
          onClear={handleClear}
          showSearch={showSearch ?? true}
          allowFocus={allowFocus}
        />

        <div className='relative'>
          <CommandList>
            {open && searchTerm && (
              <div className='absolute w-full top-0 z-50 rounded-md bg-popover text-popover-foreground shadow-md outline-none animate-in'>
                <CommandGroup className='max-h-[200px] overflow-y-scroll'>
                  {data.map(item => (
                    <CommandItem
                      key={item.id}
                      onMouseDown={evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                      }}
                      onSelect={handleValueSelect}
                    >
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </div>
      </Command>
    </React.Fragment>
  );
}

export default Search;
