'use client';

import { Search } from 'lucide-react';

interface InputSuggestionsProps {
  suggestions: Array<string>;
  onSearchOption: (value: string) => void;
}

function InputSuggestions({ suggestions, onSearchOption }: InputSuggestionsProps) {
  return (
    <ul className='flex flex-col gap-2 font-semibold text-lg'>
      {suggestions.map(suggestion => (
        <li
          key={suggestion}
          className='flex gap-x-3 items-center py-0.5'
          onMouseDown={() => onSearchOption(suggestion)}
        >
          <Search className='opacity-60 w-5 h-5' /> {suggestion}
        </li>
      ))}
    </ul>
  );
}

export { InputSuggestions };
