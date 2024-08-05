import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Categoty {
  id: number;
  name: string;
  options: Array<{ id: number; title: string }>;
}

interface FiltersOpenProps {
  data: Categoty;
  selected: Array<string>;
  onChange: (values: Array<string>) => void;
}

export default function FilterCard({ selected, data, onChange }: FiltersOpenProps) {
  return (
    <section>
      <h6 className="my-2">{data.name}</h6>
      <ToggleGroup
        value={selected}
        onValueChange={onChange}
        type="multiple"
        variant="outline"
        className="flex justify-start gap-2"
      >
        {data.options.map((option) => (
          <ToggleGroupItem key={option.id} value={option.title} aria-label="Toggle bold">
            {option.title}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </section>
  );
}
