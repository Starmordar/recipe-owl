import { useTranslations } from 'next-intl';

import { AuthLegalSection } from '@/src/entities/session';
import { publicUrls } from '@/src/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';
import { AuthWithEmail } from './auth-with-email';
import { AuthWithGoogle } from './auth-with-google';

function SignUpWidget() {
  const t = useTranslations('AuthPage.SignUp');

  return (
    <>
      <div className='flex flex-col gap-y-4 w-[360px] md:w-[480px] max-w-full bg-card py-6 md:px-8 px-6 rounded-3xl shadow-xl'>
        <AuthHeader title={t('title')}>
          <p>{t('text1')}</p>
          <p>{t('text2')}</p>
        </AuthHeader>

        <div className='flex flex-col w-full gap-y-2'>
          <AuthWithGoogle title={t('googleSignUp')} />
          <AuthWithEmail title={t('emailSignUp')} />
        </div>

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

export { SignUpWidget };
