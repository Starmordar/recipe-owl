import Link from 'next/link';

import { publicUrls } from '@/src/shared/config/url';

function AuthLegalSection() {
  return (
    <p className='text-center'>
      By signing up you agree to the{' '}
      <Link href={publicUrls.termsOfService} className='outer-link'>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href={publicUrls.privacyPolicy} className='outer-link'>
        Privacy Policy
      </Link>
    </p>
  );
}

export { AuthLegalSection };
