import { publicUrls } from '@/src/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';
import { AuthLegalSection } from './auth-legal-section';
import { AuthWithEmail } from './auth-with-email';
import { AuthWithGoogle } from './auth-with-google';

function SignUpWidget() {
  return (
    <>
      <div className='flex flex-col gap-y-4 w-[360px] md:w-[480px] max-w-full bg-card py-6 md:px-8 px-6 rounded-3xl shadow-xl'>
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
      </div>
      <AuthLegalSection />
    </>
  );
}

export { SignUpWidget };
