import { ToggleGroup, ToggleGroupItem } from '@/src/shared/ui/toggle-group';

interface SelectedIngredientsProps {
  options: Array<string>;
  selected: Array<string>;
  onChange: (values: Array<string>) => void;
}

function SelectedIngredients({ options, selected, onChange }: SelectedIngredientsProps) {
  return (
    <ToggleGroup
      value={selected}
      onValueChange={onChange}
      type='multiple'
      variant='outline'
      className='flex flex-wrap justify-start gap-2'
    >
      {options.map(option => (
        <ToggleGroupItem key={option} value={option} size='sm'>
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { SelectedIngredients };
