'use client';

import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
} from '@/components/ui/command';

interface SearchProps {
  placeholder: string;
  data: Array<{ id: number; name: string }>;

  open: boolean;
  setOpen: (value: boolean) => void;

  setSelected: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function Search({
  placeholder,
  searchTerm,
  setSearchTerm,
  setSelected,
  open,
  setOpen,
  data,
}: SearchProps) {
  function handleValueChange(value: string) {
    setSearchTerm(value);
    setOpen(!!value);
  }

  function handleValueSelect(value: string) {
    setSelected(value);
    setSearchTerm(value);
    setOpen(false);
  }

  function handleClear() {
    setSelected('');
    setSearchTerm('');
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Command onKeyDown={() => {}} className="overflow-visible bg-transparent">
        <CommandInput
          placeholder={placeholder}
          value={searchTerm}
          onValueChange={handleValueChange}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          showClear={!!searchTerm}
          onClear={handleClear}
        />

        <div className="relative">
          <CommandList>
            {open && searchTerm && (
              <div className="absolute w-full top-0 rounded-md bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item.id}
                      onMouseDown={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                      }}
                      onSelect={handleValueSelect}
                    >
                      {item.name}
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
