'use client';

import { Search } from 'lucide-react';
import { useMemo } from 'react';

interface InputSuggestionsProps {
  suggestions: Array<string>;
  onSearchOption: (value: string) => void;
}

function InputSuggestions({ suggestions, onSearchOption }: InputSuggestionsProps) {
  const uniqueSuggestions = useMemo(() => {
    return Array.from(new Set(suggestions));
  }, [suggestions]);

  return (
    <ul className='flex flex-col gap-2 font-semibold text-lg py-4'>
      {uniqueSuggestions.map(suggestion => (
        <li
          key={suggestion}
          className='flex gap-x-3 items-center py-0.5'
          onMouseDown={() => onSearchOption(suggestion)}
        >
          <Search className='opacity-60 w-5 h-5 shrink-0' />
          <span>{suggestion}</span>
        </li>
      ))}
    </ul>
  );
}

export { InputSuggestions };
