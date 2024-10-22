import { Mail } from 'lucide-react';
import Link from 'next/link';

import { publicUrls } from '@/config/url';
import { Button } from '@/shared/ui/button';

interface LoginWithEmailProps {
  title: string;
}

function LoginWithEmail({ title }: LoginWithEmailProps) {
  return (
    <Link href={publicUrls.registerWithEmail}>
      <Button className='relative w-full'>
        <Mail className='absolute left-4' /> {title}
      </Button>
    </Link>
  );
}

export default LoginWithEmail;
