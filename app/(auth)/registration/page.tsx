import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { publicUrls } from '@/config/url';
import googleIcon from '@/public/google-logo.svg';

function Page() {
  return (
    <main className='page-container pt-[5vh] px-10'>
      <div className='flex flex-col text-center text-sm'>
        <h1 className='text-2xl font-semibold mb-2'>Join Recipe OWL</h1>
        <p>Store all your favorite recipes in one place.</p>
        <p>Share your own recipes with others.</p>
      </div>

      <div className='flex flex-col w-full gap-y-2'>
        <Button className='relative' variant='outline'>
          <Image className='absolute left-4' priority src={googleIcon} alt='' /> Sign up with Google
        </Button>

        <Link href={publicUrls.registerWithEmail}>
          <Button className='relative w-full'>
            <Mail className='absolute left-4' /> Sign up with email
          </Button>
        </Link>
      </div>

      <div className='flex justify-center w-full gap-2 text-sm pt-2'>
        <p>Already have an account?</p>

        <Link href={publicUrls.signIn} className='text-sky-600 underline'>
          Sign In
        </Link>
      </div>
    </main>
  );
}

export default Page;
