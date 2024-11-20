import type { ReactNode } from 'react';

interface SearchOptionsProps {
  title: string;
  options: Array<string>;

  renderAction?: (option: string) => ReactNode;
  onSearch: (value: string) => void;
}

function SearchOptions({ title, options, renderAction, onSearch }: SearchOptionsProps) {
  return (
    <div className='py-4'>
      <h3 className='font-semibold text-base text-muted-foreground mb-3'>{title}</h3>

      <ul className='flex flex-col gap-2 font-semibold text-lg'>
        {options.map(option => (
          <li
            key={option}
            className='flex justify-between items-center py-0.5'
            onMouseDown={() => onSearch(option)}
          >
            {option}
            {renderAction?.(option)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { SearchOptions };
