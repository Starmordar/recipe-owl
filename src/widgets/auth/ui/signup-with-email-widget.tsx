import { useTranslations } from 'next-intl';

import { AuthLegalSection } from '@/src/entities/session';
import { SignupForm } from '@/src/features/session/signup';
import { publicUrls } from '@/src/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';

function SignUpWithEmailWidget() {
  const t = useTranslations('AuthPage.SignUp');

  return (
    <>
      <div className='flex flex-col gap-y-4 w-[360px] md:w-[480px] max-w-full bg-card py-6 md:px-8 px-6 rounded-3xl shadow-xl'>
        <AuthHeader title={t('emailSignUp')}>
          <p>{t('emailSignUpTitle')}</p>
        </AuthHeader>

        <SignupForm />

        <AuthChangeOption
          title={t('changeOptionTitle')}
          linkTitle={t('changeOptionLinkTitle')}
          redirectTo={publicUrls.signIn}
        />
      </div>
      <AuthLegalSection />
    </>
  );
}

export { SignUpWithEmailWidget };
