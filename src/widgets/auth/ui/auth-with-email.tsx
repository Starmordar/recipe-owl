import { Mail } from 'lucide-react';

import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
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
