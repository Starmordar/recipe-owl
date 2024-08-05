import React from 'react';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchExitProps {
  hidden: boolean;
  onExit: () => void;
}

export default function SearchExit({ hidden, onExit }: SearchExitProps) {
  if (hidden) return null;

  return (
    <Button className="min-h-10 min-w-10 rounded-full" variant="ghost" size="icon" onClick={onExit}>
      <ArrowLeft className="h-4 w-4 opacity-50" />
    </Button>
  );
}
