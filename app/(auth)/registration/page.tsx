import { publicUrls } from '@/config/url';

import ChangeOption from '../_components/change-option';
import FormHeader from '../_components/from-header';
import LoginWithEmail from '../_components/login-with-email';
import LoginWithGoogle from '../_components/login-with-google';

function Page() {
  return (
    <>
      <FormHeader title='Join Recipe OWL'>
        <p>Store all your favorite recipes in one place.</p>
        <p>Share your own recipes with others.</p>
      </FormHeader>

      <div className='flex flex-col w-full gap-y-2'>
        <LoginWithGoogle title='Sign up with Google' />
        <LoginWithEmail title='Sign up with email' />
      </div>

      <ChangeOption
        title='Already have an account?'
        linkTitle='Sign In'
        redirectTo={publicUrls.signIn}
      />
    </>
  );
}

export default Page;
