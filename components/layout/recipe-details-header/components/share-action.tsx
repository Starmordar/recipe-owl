'use client';

import { Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useWebShare from '@/hooks/useWebShare';

function ShareAction() {
  const data = {
    title: 'RecipeOWL: Discover, Cook, Share – The Wise Way',
    url: window.location.href,
  };

  const { handleShare } = useWebShare({ data });

  return (
    <Button className='relative rounded-full' variant='ghost' size='icon-xs'>
      <Share2 onClick={handleShare} className='h-5 w-5' />
    </Button>
  );
}

export default ShareAction;
