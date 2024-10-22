import { ArrowLeft } from 'lucide-react';
import React from 'react';

import { Button } from '@/shared/ui/button';

interface SearchExitProps {
  hidden: boolean;
  onExit: () => void;
}

function SearchExit({ hidden, onExit }: SearchExitProps) {
  if (hidden) return null;

  return (
    <Button className='min-h-10 min-w-10 rounded-full' variant='ghost' size='icon' onClick={onExit}>
      <ArrowLeft className='h-4 w-4 opacity-50' />
    </Button>
  );
}

export default SearchExit;
