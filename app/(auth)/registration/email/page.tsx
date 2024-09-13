import SignupForm from '@/components/signup-form';
import { publicUrls } from '@/config/url';

import ChangeOption from '../../_components/change-option';
import FormHeader from '../../_components/from-header';

function Page() {
  return (
    <>
      <FormHeader title='Sign Up with email'>
        <p>Please add your name, email and password.</p>
      </FormHeader>

      <SignupForm />

      <ChangeOption
        title='Already have an account?'
        linkTitle='Sign In'
        redirectTo={publicUrls.signIn}
      />
    </>
  );
}

export default Page;
