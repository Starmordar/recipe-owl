import Link from 'next/link';

import SignInForm from '@/components/signin-form';
import { publicUrls } from '@/config/url';

import ChangeOption from '../_components/change-option';
import FormHeader from '../_components/from-header';
import LoginWithGoogle from '../_components/login-with-google';

function Page() {
  return (
    <>
      <FormHeader title='Log in to your account'>
        <p>
          Access your Recipe OWL account to continue exploring and managing your favorite recipes!
        </p>
      </FormHeader>

      <SignInForm />

      <div className='flex items-center w-full'>
        <div className='flex-1 border-t'></div>
        <span className='mx-4'>or</span>
        <div className='flex-1 border-t'></div>
      </div>

      <div className='flex flex-col w-full gap-y-2'>
        <LoginWithGoogle title='Sign in with Google' />
      </div>

      <ChangeOption
        title="Don't have an account?"
        linkTitle='Sign Up'
        redirectTo={publicUrls.register}
      />
    </>
  );
}

export default Page;
