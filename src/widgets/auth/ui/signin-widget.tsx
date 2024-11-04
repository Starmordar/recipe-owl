import { LoginForm } from '@/src/features/session/login';
import { publicUrls } from '@/src/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';
import { AuthWithGoogle } from './auth-with-google';

function SignInWidget() {
  return (
    <div className='flex flex-col gap-y-4 w-[360px] md:w-[480px] max-w-full bg-card py-6 md:px-8 px-6 rounded-3xl shadow-xl'>
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
    </div>
  );
}

export { SignInWidget };
