import { useTranslations } from 'next-intl';

import { LoginForm } from '@/src/features/session/login';
import { publicUrls } from '@/src/shared/config/url';

import { AuthChangeOption } from './auth-change-option';
import { AuthHeader } from './auth-header';
import { AuthWithGoogle } from './auth-with-google';

function SignInWidget() {
  const t = useTranslations('AuthPage');

  return (
    <div className='flex flex-col gap-y-4 w-[360px] md:w-[480px] max-w-full bg-card py-6 md:px-8 px-6 rounded-3xl shadow-xl'>
      <AuthHeader title={t('signInTitle')}>
        <p>{t('signInText')}</p>
      </AuthHeader>

      <LoginForm />

      <div className='flex items-center w-full'>
        <div className='flex-1 border-t'></div>
        <span className='mx-4'>{t('or')}</span>
        <div className='flex-1 border-t'></div>
      </div>

      <div className='flex flex-col w-full gap-y-2'>
        <AuthWithGoogle title={t('signInWithGoogle')} />
      </div>

      <AuthChangeOption
        title={t('signInChangeOption')}
        linkTitle={t('signUpLink')}
        redirectTo={publicUrls.register}
      />
    </div>
  );
}

export { SignInWidget };
