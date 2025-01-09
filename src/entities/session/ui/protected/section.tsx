import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { Button } from '@/src/shared/ui/button';

import { AuthLegalSection } from '../auth-legal-section';

import type { PropsWithChildren } from 'react';

interface ProtectedSectionProps extends PropsWithChildren {
  title: string;
  description: string;
  className: string;
}

async function ProtectedSection({
  title,
  description,
  className,
  children,
}: ProtectedSectionProps) {
  const { user } = await validateRequest();

  if (user === null) {
    return <AuthSection title={title} description={description} className={className} />;
  }

  return <>{children}</>;
}

interface AuthSectionProps {
  title: string;
  description: string;
  className: string;
}

function AuthSection({ title, description, className }: AuthSectionProps) {
  const t = useTranslations('AuthPage');
  return (
    <div className={className}>
      <div className='grid gap-1.5 p-4 text-center sm:text-left'>
        <h2 className='text-lg font-semibold leading-none tracking-tight'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>

      <div className='mx-6 mb-6'>
        <Link href={publicUrls.signIn}>
          <Button className='relative w-full mb-2'>{t('signInAction')}</Button>
        </Link>

        <AuthLegalSection />
      </div>
    </div>
  );
}

export { ProtectedSection };
