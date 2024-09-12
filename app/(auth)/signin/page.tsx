import Image from 'next/image';
import Link from 'next/link';

import SignInForm from '@/components/signin-form';
import { Button } from '@/components/ui/button';
import { publicUrls } from '@/config/url';
import googleIcon from '@/public/google-logo.svg';

function Page() {
  return (
    <main className='page-container pt-[5vh] px-10'>
      <div className='flex flex-col text-center text-sm'>
        <h1 className='text-2xl font-semibold mb-2'>Log in to your account</h1>
        <p>
          Access your Recipe OWL account to continue exploring and managing your favorite recipes!
        </p>
      </div>

      <SignInForm />

      <div className='flex items-center w-full'>
        <div className='flex-1 border-t'></div>
        <span className='mx-4'>or</span>
        <div className='flex-1 border-t'></div>
      </div>

      <div className='flex flex-col w-full gap-y-2'>
        <Button className='relative' variant='outline'>
          <Image className='absolute left-4' priority src={googleIcon} alt='' /> Sign in with Google
        </Button>
      </div>

      <div className='flex justify-center w-full gap-2 text-sm pt-2'>
        <p>Don&apos;t have an account?</p>

        <Link href={publicUrls.register} className='text-sky-600 underline'>
          Sign Up
        </Link>
      </div>
    </main>
  );
}

export default Page;
