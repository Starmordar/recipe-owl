import Image from 'next/image';
import Link from 'next/link';

import googleIcon from '@/public/google-logo.svg';
import { Button } from '@/shared/ui/button';

interface LoginWithGoogleProps {
  title: string;
}

function LoginWithGoogle({ title }: LoginWithGoogleProps) {
  return (
    <Link href='/api/auth/google'>
      <Button className='relative w-full' variant='outline'>
        <Image className='absolute left-4' priority src={googleIcon} alt='' /> {title}
      </Button>
    </Link>
  );
}

export default LoginWithGoogle;
