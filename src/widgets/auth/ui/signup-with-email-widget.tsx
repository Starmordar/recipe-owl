import { SignupForm } from '@/src/features/session/signup';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';

import { publicUrls } from '@/src/shared/config/url';

function SignUpWithEmailWidget() {
  return (
    <>
      <AuthHeader title='Sign Up with email'>
        <p>Please add your name, email and password.</p>
      </AuthHeader>

      <SignupForm />

      <AuthChangeOption
        title='Already have an account?'
        linkTitle='Sign In'
        redirectTo={publicUrls.signIn}
      />
    </>
  );
}

export { SignUpWithEmailWidget };
