import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';

interface FiltersOpenProps {
  options: Array<string>;
  selected: Array<string>;
  onChange: (values: Array<string>) => void;
}

function CategorySection({ options, selected, onChange }: FiltersOpenProps) {
  return (
    <ToggleGroup
      value={selected}
      onValueChange={onChange}
      type='multiple'
      variant='outline'
      className='flex flex-wrap justify-start gap-2'
    >
      {options.map(option => (
        <ToggleGroupItem
          key={option}
          value={option}
          size='sm'
          className='data-[state=on]:border-primary'
        >
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default CategorySection;
