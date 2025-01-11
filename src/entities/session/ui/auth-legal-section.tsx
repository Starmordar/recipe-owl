import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';

function AuthLegalSection() {
  const t = useTranslations('AuthPage');
  return (
    <p className='text-center'>
      {t.rich('termsAgreementMessage', {
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
