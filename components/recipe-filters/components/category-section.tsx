import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Category } from '../types';

interface FiltersOpenProps {
  data: Category;
  selected: Array<string>;
  onChange: (values: Array<string>) => void;
}

function CategorySection({ data, selected, onChange }: FiltersOpenProps) {
  return (
    <section>
      <h6 className='mb-2'>{data.name}</h6>

      <ToggleGroup
        value={selected}
        onValueChange={onChange}
        type='multiple'
        variant='outline'
        className='flex justify-start gap-2'
      >
        {data.options.map(option => (
          <ToggleGroupItem
            key={option.id}
            value={option.title}
            size='sm'
            className='data-[state=on]:bg-primary data-[state=on]:text-white'
          >
            {option.title}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </section>
  );
}

export default CategorySection;
