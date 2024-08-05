import React from 'react';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FiltersOpenProps {
  hidden: boolean;
  onOpen: () => void;
}

export default function FiltersOpen({ hidden, onOpen }: FiltersOpenProps) {
  if (hidden) return null;

  return (
    <Button className="min-h-10 min-w-10 rounded-full" variant="ghost" size="icon" onClick={onOpen}>
      <SlidersHorizontal className="h-4 w-4 opacity-50" />
    </Button>
  );
}
