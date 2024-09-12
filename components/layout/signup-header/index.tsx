import Link from 'next/link';

import { publicUrls } from '@/config/url';

import AppHeader from '../app-header';

function SignUpHeader() {
  return (
    <AppHeader>
      <div className='flex w-full justify-end gap-2 text-sm'>
        <p>Don&apos;t have an account?</p>

        <Link href={publicUrls.signUp} className='text-sky-600'>
          Sign Up
        </Link>
      </div>
    </AppHeader>
  );
}

export default SignUpHeader;
