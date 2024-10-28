import { publicUrls } from '@/src/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';
import { AuthWithEmail } from './auth-with-email';
import { AuthWithGoogle } from './auth-with-google';

function SignUpWidget() {
  return (
    <>
      <AuthHeader title='Join Recipe OWL'>
        <p>Store all your favorite recipes in one place.</p>
        <p>Share your own recipes with others.</p>
      </AuthHeader>

      <div className='flex flex-col w-full gap-y-2'>
        <AuthWithGoogle title='Sign up with Google' />
        <AuthWithEmail title='Sign up with email' />
      </div>

      <AuthChangeOption
        title='Already have an account?'
        linkTitle='Sign In'
        redirectTo={publicUrls.signIn}
      />
    </>
  );
}

export { SignUpWidget };
