'use client';

import { CircleX } from 'lucide-react';
import { useRef, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { Button } from '@/src/shared/ui/button';

import { popularSearches } from '../../config/popular-searches';
import { useVisualViewportChange } from '../../lib/use-visual-viewport-change';
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
  const drawerRef = useRef<null | HTMLDivElement>(null);

  const { state } = useVisualViewportChange({ drawerRef });

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
    <RemoveScroll ref={drawerRef} forwardProps>
      <div className='fixed top-[56px] inset-x-0 h-[calc(100vh-100px)] bg-card container overflow-y-auto z-10'>
        <div>{JSON.stringify(state)}</div>
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
      </div>
    </RemoveScroll>
  );
}

export { SearchSuggestions };
