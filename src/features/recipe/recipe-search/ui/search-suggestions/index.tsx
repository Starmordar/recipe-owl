'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  heights: { top: number; bottom: number };

  searchTerm: string;
  setSelected: (value: string) => void;
  setSearchTerm: (value: string) => void;
}

function SearchSuggestions({
  suggestions,
  heights,
  searchTerm,
  setSearchTerm,
  setSelected,
}: SearchSuggestionsProps) {
  const t = useTranslations('RecipeFilters.Search');
  const [recent, setRecent] = useState(retrieveRecipeRecentSearches());
  const drawerRef = useRef<null | HTMLDivElement>(null);

  useVisualViewportChange({ drawerRef });

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
      <div
        className='fixed inset-x-0 bg-card container overflow-y-auto z-10'
        style={{
          top: `${heights.top}px`,
          height: `calc(100vh - ${heights.top + heights.bottom}px)`,
        }}
      >
        {searchTerm.length > 0 ? (
          <InputSuggestions
            suggestions={[...suggestions, searchTerm]}
            onSearchOption={onSearchOption}
          />
        ) : (
          <>
            <SearchOptions
              title={t('popularSearches')}
              options={popularSearches}
              onSearch={onSearchOption}
            />

            {recent.length > 0 && <hr className='h-0.5 border-t-0 bg-muted' />}
            {recent.length > 0 && (
              <SearchOptions
                title={t('recentSearches')}
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
                    <X className='w-5 h-5 opacity-60' />
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
