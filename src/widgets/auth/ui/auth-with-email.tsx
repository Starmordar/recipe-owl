import { Mail } from 'lucide-react';
import Link from 'next/link';

import { publicUrls } from '@/src/shared/config/url';
import { Button } from '@/src/shared/ui/button';

interface AuthWithEmailProps {
  title: string;
}

function AuthWithEmail({ title }: AuthWithEmailProps) {
  return (
    <Link href={publicUrls.registerWithEmail}>
      <Button className='relative w-full'>
        <Mail className='absolute left-4' /> {title}
      </Button>
    </Link>
  );
}

export { AuthWithEmail };
