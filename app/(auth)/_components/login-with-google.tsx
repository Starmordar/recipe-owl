import Image from 'next/image';

import { Button } from '@/components/ui/button';
import googleIcon from '@/public/google-logo.svg';

interface LoginWithGoogleProps {
  title: string;
}

function LoginWithGoogle({ title }: LoginWithGoogleProps) {
  return (
    <Button className='relative' variant='outline'>
      <Image className='absolute left-4' priority src={googleIcon} alt='' /> {title}
    </Button>
  );
}

export default LoginWithGoogle;
