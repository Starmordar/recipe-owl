'use client';

import { CircleX } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/src/shared/ui/button';

import { popularSearches } from '../../config/popular-searches';
import {
  removeRecipeRecentSearches,
  retrieveRecipeRecentSearches,
} from '../../model/recent-searches';

import { InputSuggestions } from './input-suggestions';
import { SearchOptions } from './search-options';

interface SearchSuggestionsProps {
  suggestions: Array<string>;

  searchTerm: string;
  setSelected: (value: string) => void;
  setSearchTerm: (value: string) => void;
}

function SearchSuggestions({
  suggestions,
  searchTerm,
  setSearchTerm,
  setSelected,
}: SearchSuggestionsProps) {
  const [recent, setRecent] = useState(retrieveRecipeRecentSearches());

  function onSearchOption(search: string) {
    setSearchTerm(search);
    setSelected(search);
    setRecent(retrieveRecipeRecentSearches());
  }

  function onRemoveRecent(search: string) {
    removeRecipeRecentSearches(search);
    setRecent(retrieveRecipeRecentSearches());
  }

  return (
    <>
      {searchTerm.length > 0 ? (
        <InputSuggestions
          suggestions={[...suggestions, searchTerm]}
          onSearchOption={onSearchOption}
        />
      ) : (
        <>
          <SearchOptions
            title='Popular searches'
            options={popularSearches}
            onSearch={onSearchOption}
          />

          {recent.length > 0 && <hr className='h-0.5 border-t-0 bg-muted' />}
          {recent.length > 0 && (
            <SearchOptions
              title='Recent searches'
              options={recent}
              onSearch={onSearchOption}
              renderAction={option => (
                <Button
                  onMouseDown={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    onRemoveRecent(option);
                  }}
                  size='icon-xs'
                  variant='ghost'
                >
                  <CircleX className='w-5 h-5 opacity-60' />
                </Button>
              )}
            />
          )}
        </>
      )}
    </>
  );
}

export { SearchSuggestions };
