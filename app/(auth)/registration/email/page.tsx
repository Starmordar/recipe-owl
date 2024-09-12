import Link from 'next/link';

import SignupForm from '@/components/signup-form';
import { publicUrls } from '@/config/url';

function Page() {
  return (
    <main className='page-container pt-[5vh] px-10'>
      <div className='flex flex-col text-center text-sm'>
        <h1 className='text-2xl font-semibold mb-2'>Sign Up with email</h1>
        <p>Please add your name, email and password.</p>
      </div>

      <SignupForm />

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
