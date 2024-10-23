import { LoginForm } from '@/features/session/login';
import { publicUrls } from '@/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';
import { AuthWithGoogle } from './auth-with-google';

function SignInWidget() {
  return (
    <>
      <AuthHeader title='Log in to your account'>
        <p>
          Access your Recipe OWL account to continue exploring and managing your favorite recipes!
        </p>
      </AuthHeader>

      <LoginForm />

      <div className='flex items-center w-full'>
        <div className='flex-1 border-t'></div>
        <span className='mx-4'>or</span>
        <div className='flex-1 border-t'></div>
      </div>

      <div className='flex flex-col w-full gap-y-2'>
        <AuthWithGoogle title='Sign in with Google' />
      </div>

      <AuthChangeOption
        title="Don't have an account?"
        linkTitle='Sign Up'
        redirectTo={publicUrls.register}
      />
    </>
  );
}

export { SignInWidget };
