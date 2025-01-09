import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';

function AuthLegalSection() {
  const t = useTranslations('AuthPage');
  return (
    <p className='text-center'>
      {t.rich('termsWarning', {
        terms: chunk => (
          <Link href={publicUrls.termsOfService} className='outer-link'>
            {chunk}
          </Link>
        ),
        policy: chunk => (
          <Link href={publicUrls.privacyPolicy} className='outer-link'>
            {chunk}
          </Link>
        ),
      })}
    </p>
  );
}

export { AuthLegalSection };
