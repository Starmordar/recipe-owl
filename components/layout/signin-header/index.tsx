import Link from 'next/link';

import { publicUrls } from '@/config/url';

import AppHeader from '../app-header';

function SignUpHeader() {
  return (
    <AppHeader>
      <div className='flex w-full justify-end gap-2 text-sm'>
        <p>Already have an account?</p>

        <Link href={publicUrls.signIn} className='text-sky-600'>
          Sign In
        </Link>
      </div>
    </AppHeader>
  );
}

export default SignUpHeader;
