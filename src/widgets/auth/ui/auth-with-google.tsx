import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import Link from 'next/link';

import googleIcon from '@/public/google-logo.svg';
import { apiUrls } from '@/src/shared/config/url';
import { Button } from '@/src/shared/ui/button';

interface AuthWithGoogleProps {
  title: string;
}

function AuthWithGoogle({ title }: AuthWithGoogleProps) {
  return (
    <Link href={apiUrls.google_oauth}>
      <Button className='relative w-full' variant='outline'>
        <Image className='absolute left-4' priority src={googleIcon} alt='' /> {title}
      </Button>
    </Link>
  );
}

export { AuthWithGoogle };
