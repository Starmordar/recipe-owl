import { SignupForm } from '@/src/features/session/signup';
import { publicUrls } from '@/src/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';

function SignUpWithEmailWidget() {
  return (
    <div className='flex flex-col gap-y-4 w-[360px] md:w-[480px] max-w-full bg-card py-6 md:px-8 px-6 rounded-3xl shadow-xl'>
      <AuthHeader title='Sign Up with email'>
        <p>Please add your name, email and password.</p>
      </AuthHeader>

      <SignupForm />

      <AuthChangeOption
        title='Already have an account?'
        linkTitle='Sign In'
        redirectTo={publicUrls.signIn}
      />
    </div>
  );
}

export { SignUpWithEmailWidget };
